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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';


@UseGuards(AuthGuard, RolesGuard)
@Roles('user')
@ApiTags('Basket')
@ApiBearerAuth()
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) { }

  @Post()
  @ApiOperation({ summary: 'Add product to basket (User only)' })
  create(@Req() req, @Body() createBasketDto: CreateBasketDto) {
    return this.basketService.create(req.user, createBasketDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products in the basket (User only)' })
  findAll(@Req() req) {
    return this.basketService.findAll(req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update quantity of product in the basket (User only)' })
  @ApiParam({ name: 'id', type: String, description: 'Basket item ID' })
  @ApiBody({ type: UpdateBasketDto })
  update(@Req() req, @Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(req.user, +id, updateBasketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove product from basket (User only)' })
  @ApiParam({ name: 'id', type: String, description: 'Basket item ID' })
  remove(@Req() req, @Param('id') id: string) {
    return this.basketService.remove(req.user,+id);
  }

  @Delete('/clear')
  @ApiOperation({ summary: 'Clear the basket (User only)' })
  clearBasket(@Req() req) {
    return this.basketService.clearBasket(req.user);
  }
}
