import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ConfigModule } from '@nestjs/config';
import { QueueProcessor } from './queue.processor';
import { MailModule } from 'src/mail/mail.module';
import { PdfModule } from 'src/pdf/pdf.module';

@Module({
  imports: [ConfigModule, MailModule, PdfModule],
  providers: [QueueService, QueueProcessor],
  exports: [QueueService],
})
export class QueueModule {}
