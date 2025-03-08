/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Kategoriya nomi' })
  @IsString({ message: 'Kategoriya nomi satr (string) bo‘lishi kerak.' })
  name: string;

  @ApiPropertyOptional({ example: 'All kinds of electronic devices', description: 'Kategoriya tavsifi' })
  @IsOptional()
  @IsString({ message: 'Kategoriya tavsifi satr (string) bo‘lishi kerak.' })
  description?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg', description: 'Kategoriya rasmi (URL yoki fayl nomi)' })
  @IsOptional()
  @IsString({ message: 'Kategoriya rasmi satr (string) bo‘lishi kerak.' })
  image?: string;
}
