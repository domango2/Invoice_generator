import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prismaService: PrismaService) {}

  async getClientByEmail(email: string) {
    const client = await this.prismaService.client.findUnique({
      where: { email },
      include: { company: true },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async getAllClients() {
    return this.prismaService.client.findMany({
      include: { company: true },
    });
  }

  async getClientWithInvoices(email: string) {
    const client = await this.prismaService.client.findUnique({
      where: { email },
      include: {
        company: true,
        invoices: {
          include: { items: true },
        },
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async createClient(dto: CreateClientDto) {
    let companyId = dto.companyId;

    if (!companyId && dto.companyName) {
      const existing = await this.prismaService.company.findFirst({
        where: { name: dto.companyName },
      });

      if (existing) {
        companyId = existing.id;
      } else if (dto.companyAddress) {
        const newCompany = await this.prismaService.company.create({
          data: {
            name: dto.companyName,
            address: dto.companyAddress,
          },
        });
        companyId = newCompany.id;
      } else {
        throw new NotFoundException(
          'Company not found and no address provided for creation',
        );
      }
    }

    const client = await this.prismaService.client.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        company: { connect: { id: companyId } },
      },
      include: { company: true },
    });

    return client;
  }

  async updateClient(dto: UpdateClientDto) {
    const { email, ...updateData } = dto;

    const existing = await this.prismaService.client.findUnique({
      where: { email },
    });
    if (!existing) {
      throw new NotFoundException('Client not found');
    }

    return this.prismaService.client.update({
      where: { email },
      data: updateData,
      include: { company: true },
    });
  }

  async deleteClient(email: string) {
    const existing = await this.prismaService.client.findUnique({
      where: { email },
    });
    if (!existing) {
      throw new NotFoundException('Client not found');
    }

    return this.prismaService.client.delete({ where: { email } });
  }
}
