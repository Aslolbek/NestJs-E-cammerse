/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Product } from './entities/product.entity';

@Module({
  imports:[

    TypeOrmModule.forFeature([Category, Product]),
    AuthModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
