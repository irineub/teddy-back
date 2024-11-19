import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(100, { message: 'Name cannot be longer than 100 characters' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Salary must be a number' })
  @Min(0, { message: 'Salary must be at least 0' })
  salary?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Company Value must be a number' })
  @Min(0, { message: 'Company Value must be at least 0' })
  companyValue?: number;
}
