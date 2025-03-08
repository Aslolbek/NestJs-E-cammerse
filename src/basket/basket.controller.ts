/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { Roles } from 'src/shared/guard/roles.decorator';


@UseGuards(AuthGuard, RolesGuard)
@Roles('user')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) { }

  @Post()
  create(@Req() req, @Body() createBasketDto: CreateBasketDto) {
    return this.basketService.create(req.user, createBasketDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.basketService.findAll(req.user);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(req.user, +id, updateBasketDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.basketService.remove(req.user,+id);
  }
  
  @Delete('/clear')
  clearBasket(@Req() req) {
    return this.basketService.clearBasket(req.user);
  }
}
