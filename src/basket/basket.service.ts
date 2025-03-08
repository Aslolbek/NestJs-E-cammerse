/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}


  async create(user: User, createBasketDto: CreateBasketDto): Promise<{ message: string, basketItem: Basket}> {
    const { productId, quantity } = createBasketDto;
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException(`Mahsulot topilmadi: ID ${productId}`);

    let basketItem = await this.basketRepository.findOne({
      where: { user: { id: user.id }, product: { id: productId } },
    });

    if (basketItem) {
      basketItem.quantity += quantity;
    } else {
      basketItem = this.basketRepository.create({
        user,
        product,
        quantity,
      });
    }

    await this.basketRepository.save(basketItem);
    return { 
      message: 'Mahsulot savatchaga qo‘shildi',
      basketItem };
  }

  async findAll(user: User): Promise<Basket[]> {
    const basket = await this.basketRepository.find({
      where: { user: { id: user.id } },
      relations: ['product'],
    });
    return basket;
  }

  async update(user: User, id: number, updateBasketDto: UpdateBasketDto) {
    const basketItem = await this.basketRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!basketItem) throw new NotFoundException(`Savatchada bunday mahsulot yo‘q: ID ${id}`);

    basketItem.quantity = updateBasketDto.quantity;
    await this.basketRepository.save(basketItem);

    return { message: 'Mahsulot miqdori yangilandi', basketItem };
  }

  async remove(user: User, id: number) {
    const basketItem = await this.basketRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!basketItem) throw new NotFoundException(`Savatchada bunday mahsulot yo‘q: ID ${id}`);

    await this.basketRepository.remove(basketItem);
    return { message: 'Mahsulot savatchadan o‘chirildi' };
  }

  async clearBasket(user: User) {
    await this.basketRepository.delete({ user: { id: user.id } });
    return { message: 'Savatcha tozalandi' };
  }
}
