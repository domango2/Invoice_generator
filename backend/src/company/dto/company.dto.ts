import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CompanyDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 'Acme Corp', description: 'Company name' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: '123 Main St, New York, NY',
    description: 'Company address',
  })
  @IsString()
  @MaxLength(255)
  address: string;
}
