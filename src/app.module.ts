/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost', 
      port: 5432, 
      username: 'postgres', 
      password: '11', 
      database: 'ecammerse',
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    UserModule,
    CategoryModule,
    ProductModule, 
    BasketModule,
    OrderModule, 
    AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
