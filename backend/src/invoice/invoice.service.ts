import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueueService } from '../queue/queue.service';
import { Prisma } from '@prisma/client';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export default class InvoiceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly queueService: QueueService,
  ) {}

  async getInvoiceByNumber(number: string) {
    const invoice = await this.prismaService.invoice.findUnique({
      where: { number },
      include: {
        client: { include: { company: true } },
        items: true,
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice ${number} not found`);
    }

    return invoice;
  }

  async createInvoiceRequest(dto: CreateInvoiceDto) {
    const { email, items } = dto;

    await this.prismaService.invoiceRequest.create({
      data: {
        email,
        items: items as unknown as Prisma.InputJsonValue,
      },
    });

    const client = await this.prismaService.client.findUnique({
      where: { email },
      include: { company: true },
    });

    if (!client) {
      throw new NotFoundException(`Client with email ${email} not found`);
    }

    const now = new Date();
    const lastInvoice = await this.prismaService.invoice.findFirst({
      orderBy: { id: 'desc' },
    });
    const invoiceNumber = `INV-${now.getFullYear()}-${(lastInvoice?.id || 0) + 1}`;

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0,
    );
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    const createdInvoice = await this.prismaService.invoice.create({
      data: {
        number: invoiceNumber,
        date: now,
        dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        client: { connect: { email } },
        subtotal,
        tax,
        total,
        items: {
          create: items.map((item) => ({
            description: item.name,
            price: item.price,
            quantity: item.quantity || 1,
          })),
        },
      },
    });

    await this.queueService.addInvoiceJob({
      invoiceNumber,
      date: now.toISOString,
      firstName: client.firstName,
      lastName: client.lastName,
      company: client.company?.name || '',
      email: client.email,
      items: items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      taxRate: taxRate * 100,
    });

    return {
      message: 'Invoice request received and being processed',
      client,
      invoiceNumber,
      total,
    };
  }
}
