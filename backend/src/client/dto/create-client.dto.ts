import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    example: 'jane.doe@example.com',
    description: 'Client email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Jane', description: 'Client first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Client last name' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Company ID if known',
  })
  @IsOptional()
  companyId?: number;

  @ApiPropertyOptional({
    example: 'Acme Corp',
    description: 'Company name if known',
  })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({
    example: '456 Market St, San Francisco, CA',
    description: 'Company address if known',
  })
  @IsOptional()
  @IsString()
  companyAddress?: string;
}
