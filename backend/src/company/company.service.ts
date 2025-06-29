import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCompany(dto: CreateCompanyDto) {
    return this.prismaService.company.create({ data: dto });
  }

  async getAllCompanies() {
    return this.prismaService.company.findMany();
  }

  async getCompanyById(id: number) {
    const company = await this.prismaService.company.findUnique({
      where: { id },
    });
    if (!company) throw new NotFoundException(`Company ${id} not found`);
    return company;
  }

  async updateCompany(id: number, dto: CreateCompanyDto) {
    return this.prismaService.company.update({
      where: { id },
      data: dto,
    });
  }

  async deleteCompany(id: number) {
    return this.prismaService.company.delete({ where: { id } });
  }
}
