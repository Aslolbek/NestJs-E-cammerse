/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateBasketDto {
    @ApiProperty({ example: 1, description: 'Mahsulot ID raqami' })
  @IsInt({ message: 'Mahsulot IDsi butun son (integer) bo‘lishi kerak.' })
  @IsNotEmpty({ message: 'Mahsulot IDsi bo‘sh bo‘lishi mumkin emas.' })
  productId: number;

  @ApiProperty({ example: 2, description: 'Mahsulot miqdori (kamida 1)' })
  @IsInt({ message: 'Miqdori butun son (integer) bo‘lishi kerak.' })
  @Min(1, { message: 'Mahsulot miqdori kamida 1 bo‘lishi kerak.' })
  quantity: number;
}
