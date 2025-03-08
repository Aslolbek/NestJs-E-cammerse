/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({ example: 'Electronics', description: 'Kategoriya nomi' })
  @IsOptional()
  @IsString({ message: 'Kategoriya nomi satr (string) bo‘lishi kerak.' })
  name?: string;

  @ApiPropertyOptional({ example: 'All kinds of electronic devices', description: 'Kategoriya tavsifi' })
  @IsOptional()
  @IsString({ message: 'Kategoriya tavsifi satr (string) bo‘lishi kerak.' })
  description?: string;
}
