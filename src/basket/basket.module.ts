/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Product } from 'src/product/entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Basket, Product]),
    AuthModule
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports:[BasketService]
})
export class BasketModule {}
