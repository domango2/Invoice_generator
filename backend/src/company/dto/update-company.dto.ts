import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCompanyDto {
  @ApiPropertyOptional({
    example: 'Acme Corp Updated',
    description: 'New company name',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    example: '456 Market St, San Francisco, CA',
    description: 'New company address',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;
}
