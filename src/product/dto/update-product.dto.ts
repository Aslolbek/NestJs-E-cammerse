/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {

  @IsString({ message: 'Nomi string formatda bo‘lishi kerak' })
  name?: string;

  @IsString({ message: 'Tavsif string formatda bo‘lishi kerak' })
  description?: string;

  @IsNumber({}, { message: 'Narx raqam formatida bo‘lishi kerak' })
  @Min(0, { message: 'Narx 0 dan kam bo‘lishi mumkin emas' })
  @Type(() => Number)
  price?: number;

  @IsNumber({}, { message: 'Ombordagi son raqam formatida bo‘lishi kerak' })
  @Min(0, { message: 'Ombordagi son 0 dan kam bo‘lishi mumkin emas' })
  @Type(() => Number)
  stock?: number;


  @IsNumber({}, { message: 'Kategoriya ID raqam formatida bo‘lishi kerak' })
  @Type(() => Number)
  categoryId?: number;
}
