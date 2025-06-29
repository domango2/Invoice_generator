import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './client/client.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PdfModule } from './pdf/pdf.module';
import { QueueModule } from './queue/queue.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ClientModule,
    InvoiceModule,
    PdfModule,
    QueueModule,
    MailModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
