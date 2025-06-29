import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'Acme Corp',
    description: 'Company name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '123 Main St, New York, NY',
    description: 'Company address',
  })
  @IsString()
  address: string;
}
