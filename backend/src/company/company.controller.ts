import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyDto } from './dto/company.dto';

@ApiTags('Companies')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: 201,
    description: 'Company successfully created',
    type: CompanyDto,
  })
  async create(@Body() dto: CreateCompanyDto) {
    return this.companyService.createCompany(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, type: [CompanyDto] })
  async findAll() {
    return this.companyService.getAllCompanies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CompanyDto })
  async findOne(@Param('id') id: string) {
    return this.companyService.getCompanyById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company data by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CompanyDto })
  async update(@Param('id') id: string, @Body() dto: CreateCompanyDto) {
    return this.companyService.updateCompany(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  async delete(@Param('id') id: string) {
    return this.companyService.deleteCompany(+id);
  }
}
