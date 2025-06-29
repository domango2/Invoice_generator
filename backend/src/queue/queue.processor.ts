import { Injectable, OnModuleInit } from '@nestjs/common';
import { Worker } from 'bullmq';
import { PdfService } from '../pdf/pdf.service';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueueProcessor implements OnModuleInit {
  constructor(
    private readonly pdfService: PdfService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    const worker = new Worker(
      'invoice',
      async (job) => {
        try {
          console.log('⚙️  Processing invoice job:', job.data);

          const pdf = await this.pdfService.generateInvoicePdf({
            ...job.data,
            sender: {
              name: 'Margaret Brick',
              address: 'Brick & Willow, NY',
              email: 'hello@brickandwillow.com',
              phone: '(123) 456-7890',
            },
          });

          console.log('📎 Sending email to:', job.data.email);

          await this.mailService.sendInvoiceEmail(job.data.email, pdf);
        } catch (error) {
          console.error('❌ Worker error:', error);
        }
      },
      {
        connection: {
          host: this.configService.getOrThrow<string>('REDIS_HOST'),
          port: this.configService.getOrThrow<number>('REDIS_PORT'),
        },
      },
    );
  }
}
