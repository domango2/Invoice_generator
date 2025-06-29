import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
import { ClientWithInvoicesDto } from './dto/client-with-invoices.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Clients')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  @ApiOperation({ summary: 'Get client by email' })
  @ApiQuery({ name: 'email', required: true, example: 'user@example.com' })
  @ApiResponse({ status: 200, type: ClientDto })
  async getClient(@Query('email') email: string) {
    return this.clientService.getClientByEmail(email);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, type: [ClientDto] })
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Get('details')
  @ApiQuery({ name: 'email', example: 'client@example.com' })
  @ApiOperation({ summary: 'Get client with invoices' })
  @ApiResponse({ status: 200, type: ClientWithInvoicesDto })
  async getClientDetails(@Query('email') email: string) {
    return this.clientService.getClientWithInvoices(email);
  }

  @Post()
  @ApiOperation({ summary: 'Create client and assign company' })
  @ApiResponse({ status: 201, type: ClientDto })
  async createClient(@Body() dto: CreateClientDto) {
    return this.clientService.createClient(dto);
  }

  @Put()
  @ApiOperation({ summary: 'Update client data' })
  @ApiResponse({ status: 200, type: ClientDto })
  async updateClient(@Body() dto: UpdateClientDto) {
    return this.clientService.updateClient(dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete client by email' })
  @ApiQuery({ name: 'email', required: true, example: 'client@example.com' })
  @ApiResponse({ status: 200, description: 'Client deleted' })
  async deleteClient(@Query('email') email: string) {
    return this.clientService.deleteClient(email);
  }
}
