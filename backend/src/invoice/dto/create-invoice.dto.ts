import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { InvoiceItemDto } from './invoice-item.dto';

export class CreateInvoiceDto {
  @ApiProperty({
    example: 'client@example.com',
    description: 'Client email to link the invoice',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: [InvoiceItemDto],
    description: 'Array of items to include in the invoice',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}
