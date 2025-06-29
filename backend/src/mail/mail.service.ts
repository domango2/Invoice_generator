import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly resend: Resend;
  private readonly fromEmail: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('RESEND_API_KEY');
    this.fromEmail = this.configService.getOrThrow<string>('RESEND_FROM_EMAIL');
    this.resend = new Resend(apiKey);
  }

  async sendInvoiceEmail(to: string, pdf: Buffer) {
    try {
      const result = await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject: 'Your Invoice from Brick & Willow',
        html: '<p>Your invoice is attached as a PDF.</p>',
        attachments: [
          {
            filename: 'invoice.pdf',
            content: pdf.toString('base64'),
          },
        ],
      });

      this.logger.log(`✅ Invoice sent to ${to}: ${JSON.stringify(result)}`);
    } catch (error) {
      this.logger.error(`❌ Failed to send invoice to ${to}`, error);
      throw error;
    }
  }
}
