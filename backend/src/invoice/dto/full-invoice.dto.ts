import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from '../../client/dto/client.dto';
import { InvoiceItemDto } from './invoice-item.dto';

export class FullInvoiceDto {
  @ApiProperty({ example: 'INV-2025-1' })
  number: string;

  @ApiProperty({ example: '2025-06-29T14:00:00.000Z' })
  date: string;

  @ApiProperty({ example: '2025-07-29T14:00:00.000Z' })
  dueDate: string;

  @ApiProperty({ example: 100.0 })
  subtotal: number;

  @ApiProperty({ example: 8.0 })
  tax: number;

  @ApiProperty({ example: 108.0 })
  total: number;

  @ApiProperty({ type: () => [InvoiceItemDto] })
  items: InvoiceItemDto[];

  @ApiProperty({ type: () => ClientDto })
  client: ClientDto;
}
