/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { Roles } from 'src/shared/guard/roles.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Post()
  create(@Req() req) {
    return this.orderService.create(req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Get('user/:id')
  findUserOrders(@Param('id') userId: number) {
    return this.orderService.findUserOrders(userId);
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.orderService.findOne(+id);
  }

  

 
}
