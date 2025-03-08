/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { BasketService } from 'src/basket/basket.service';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly basketService: BasketService,
  ) { }
  async create(user: User): Promise<Order[]> {

    const basketItems = await this.basketService.findAll(user);

    if (basketItems.length === 0) {
      throw new ForbiddenException('Savatcha bo‘sh, buyurtma yaratish mumkin emas!');
    }

    const orders: Order[] = [];

    for (const item of basketItems) {
      const order = this.orderRepository.create({
        user,
        product: item.product,
        quantity: item.quantity,
      });
      orders.push(await this.orderRepository.save(order));
    }

    await this.basketService.clearBasket(user);
    return orders;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find({ relations: ['user', 'product'] });
    if (!orders) {
      throw new NotFoundException('Buyurtmalar yo\'q')
    }
    return orders
  }

  async findUserOrders(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });

    if (!order) {
      throw new NotFoundException(`Buyurtma topilmadi: ID ${id}`);
    }

    return order;
  }

}
