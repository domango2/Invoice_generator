import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';
import { CompanyDto } from '../../company/dto/company.dto';

export class ClientDto {
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
}
