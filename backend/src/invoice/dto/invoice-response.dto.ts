import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from 'src/client/dto/client.dto';

export class InvoiceResponseDto {
  @ApiProperty({ example: 'Invoice request received and being processed' })
  message: string;

  @ApiProperty({ type: () => ClientDto })
  client: ClientDto;

  @ApiProperty({ example: 'INV-2025-1' })
  invoiceNumber: string;

  @ApiProperty({ example: 162.0 })
  total: number;
}
