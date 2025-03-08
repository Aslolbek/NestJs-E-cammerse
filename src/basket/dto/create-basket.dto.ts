/* eslint-disable prettier/prettier */

import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateBasketDto {
    @IsInt()
    @IsNotEmpty()
    productId: number;
  
    @IsInt()
    @Min(1)
    quantity: number;
}
