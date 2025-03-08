/* eslint-disable prettier/prettier */
import { IsInt, IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
