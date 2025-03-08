/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateBasketDto } from './create-basket.dto';
import { IsInt, Min } from 'class-validator';

export class UpdateBasketDto extends PartialType(CreateBasketDto) {
    @IsInt()
  @Min(1)
  quantity: number;
}
