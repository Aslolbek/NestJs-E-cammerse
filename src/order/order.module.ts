/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { BasketModule } from 'src/basket/basket.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order]),
    BasketModule,
    AuthModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
