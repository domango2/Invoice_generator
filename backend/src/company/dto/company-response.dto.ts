import { ApiProperty } from '@nestjs/swagger';

export class CompanyResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 'Acme Corp', description: 'Company name' })
  name: string;

  @ApiProperty({
    example: '123 Main St, New York, NY',
    description: 'Company address',
  })
  address: string;
}
