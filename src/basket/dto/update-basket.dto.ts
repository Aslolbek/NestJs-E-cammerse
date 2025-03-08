/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateBasketDto } from './create-basket.dto';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBasketDto extends PartialType(CreateBasketDto) {
    @ApiProperty({ example: 3, description: 'Yangilanadigan mahsulot miqdori (kamida 1)', required: false })
    @IsInt({ message: 'Miqdori butun son (integer) bo‘lishi kerak.' })
    @Min(1, { message: 'Mahsulot miqdori kamida 1 bo‘lishi kerak.' })
    quantity: number;
}
