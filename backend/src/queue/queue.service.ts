import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueueService {
  public invoiceQueue: Queue;

  constructor(private configService: ConfigService) {
    const redisHost = this.configService.getOrThrow<string>('REDIS_HOST');
    const redisPort = this.configService.getOrThrow<number>('REDIS_PORT');

    this.invoiceQueue = new Queue('invoice', {
      connection: {
        host: redisHost,
        port: redisPort,
      },
    });

    this.invoiceQueue.on('error', (err) => {
      console.error('Queue error:', err);
    });

    this.invoiceQueue.on('waiting', (job) => {
      console.log(`Job ${job.id} waiting`);
    });
  }

  async onModuleInit() {
    const client = await this.invoiceQueue.client;
    const status = client.status;

    if (status === 'ready') {
      console.log('✅ Connected to Redis');
    } else {
      console.log(`Redis connection status: ${status}`);
    }
  }

  async addInvoiceJob(payload: any) {
    await this.invoiceQueue.add('generate-and-send-invoice', payload);
  }
}
