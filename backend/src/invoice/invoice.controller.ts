import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import InvoiceService from './invoice.service';
import { FullInvoiceDto } from './dto/full-invoice.dto';
import { InvoiceResponseDto } from './dto/invoice-response.dto';

@ApiTags('Invoices')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create invoice request' })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({
    status: 201,
    description: 'Invoice created and processing started.',
    type: InvoiceResponseDto,
  })
  async createInvoice(
    @Body() dto: CreateInvoiceDto,
  ): Promise<InvoiceResponseDto> {
    return this.invoiceService.createInvoiceRequest(dto);
  }

  @Get(':number')
  @ApiOperation({ summary: 'Get invoice by number' })
  @ApiResponse({ status: 200, type: FullInvoiceDto })
  async getInvoiceByNumber(@Param('number') number: string) {
    return this.invoiceService.getInvoiceByNumber(number);
  }
}
