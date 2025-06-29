import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import InvoiceService from './invoice.service';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [QueueModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
