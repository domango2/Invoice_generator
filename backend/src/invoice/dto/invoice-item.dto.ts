import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MaxLength,
} from 'class-validator';

export class InvoiceItemDto {
  @ApiProperty({
    example: 'Web Design Services',
    description: 'Description of the item or service',
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 150,
    description: 'Price per unit (must be positive)',
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Quantity of the item (optional, default = 1)',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number = 1;
}
