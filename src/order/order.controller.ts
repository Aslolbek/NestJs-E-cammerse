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
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Post()
  @ApiOperation({ summary: 'Create an order (User only)' })
  create(@Req() req) {
    return this.orderService.create(req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'Get all orders (Admin only)' })
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Get('user/:id')
  @ApiOperation({ summary: 'Get user’s orders (User only)' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  findUserOrders(@Param('id') userId: number) {
    return this.orderService.findUserOrders(userId);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Order ID' })
  findOne(@Param('id') id: number) {
    return this.orderService.findOne(+id);
  }

  

 
}
