/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {

  @ApiProperty({ example: 'Smartphone Pro', description: 'Yangi mahsulot nomi', required: false })
  @IsString({ message: 'Nomi string formatda bo‘lishi kerak' })
  name?: string;

  @ApiProperty({ example: 'Updated model with 256GB storage', description: 'Yangi mahsulot tavsifi', required: false })
  @IsString({ message: 'Tavsif string formatda bo‘lishi kerak' })
  description?: string;

  @ApiProperty({ example: 1099.99, description: 'Yangi mahsulot narxi', required: false })
  @IsNumber({}, { message: 'Narx raqam formatida bo‘lishi kerak' })
  @Min(0, { message: 'Narx 0 dan kam bo‘lishi mumkin emas' })
  @Type(() => Number)
  price?: number;

  @ApiProperty({ example: 100, description: 'Yangi ombordagi miqdor', required: false })
  @IsNumber({}, { message: 'Ombordagi son raqam formatida bo‘lishi kerak' })
  @Min(0, { message: 'Ombordagi son 0 dan kam bo‘lishi mumkin emas' })
  @Type(() => Number)
  stock?: number;


  @ApiProperty({ example: 2, description: 'Yangi kategoriya ID', required: false })
  @IsNumber({}, { message: 'Kategoriya ID raqam formatida bo‘lishi kerak' })
  @Type(() => Number)
  categoryId?: number;
}
