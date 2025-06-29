import { ApiProperty } from '@nestjs/swagger';
import { CreateInvoiceDto } from '../../invoice/dto/create-invoice.dto';
import { CompanyDto } from '../../company/dto/company.dto';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class ClientWithInvoicesDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    example: 'client@example.com',
    description: 'Client email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John', description: 'Client first name' })
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Client last name' })
  @IsString()
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ type: () => CompanyDto })
  company: CompanyDto;

  @ApiProperty({ type: () => [CreateInvoiceDto] })
  invoices: CreateInvoiceDto[];
}
