import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({
    example: 'client@example.com',
    description: 'Client email address',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'John', description: 'New first name' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'New last name' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 1, description: 'New Company ID' })
  @IsOptional()
  companyId?: number;
}
