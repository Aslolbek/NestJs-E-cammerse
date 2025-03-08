/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }


  async create(createProductDto: CreateProductDto, image?: Express.Multer.File): Promise<{message: string, product: Product}> {
    const { categoryId, name, description, price, stock } = createProductDto;

    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException('Kategoriya topilmadi');
    }
    const imagePath = image?.path || undefined;

    const newProduct = this.productRepository.create({
      name,
      description,
      price,
      stock,
      category,
      image: imagePath,
    });

    const savedProduct = await this.productRepository.save(newProduct);

    return {
      message: `Yangi mahsulot qo‘shildi!`,
      product: savedProduct,
    };
  }


  async findAll(): Promise<{ message: string; products: Product[] }> {
    const products = await this.productRepository.find({ relations: ['category'] });

    if (products.length === 0) {
      throw new NotFoundException('Hozircha hech qanday mahsulot mavjud emas');
    }

    return {
      message: 'Mahsulotlar ro‘yxati',
      products,
    };
  }

  async findOne(id: number): Promise<{ message: string; product: Product }> {

    if (!id || isNaN(id)) {
      throw new BadRequestException('Yaroqli mahsulot IDsi yuborilishi kerak');
    }

    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });

    if (!product) {
      throw new NotFoundException(`Mahsulot topilmadi: ID ${id}`);
    }

    return {
      message: 'Mahsulot topildi',
      product,
    };
  }


  async update(id: number, updateProductDto: UpdateProductDto, image?: Express.Multer.File): Promise<{ message: string, updatedProduct: Product }> {

    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
    
    if (!product) {
      throw new NotFoundException(`Mahsulot topilmadi: ID ${id}`);
    }


    if (image && product.image) {
            try {
              fs.unlinkSync(product.image);
              product.image = image.path;
            } catch (error) {
              console.error(`❗ Eski rasmni o‘chirishda xatolik: ${error}`);
            }
        }

    Object.assign(product, updateProductDto);

    const updatedProduct = await this.productRepository.save(product);

    return {
      message: 'Mahsulot muvaffaqiyatli yangilandi!',
      updatedProduct,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Mahsulot topilmadi: ID ${id}`);
    }

    if (product.image) {
      fs.unlinkSync(product.image);
    }

    await this.productRepository.remove(product);
    return {
      message: `Mahsulot muvaffaqiyatli o‘chirildi: ID ${id}`,
    };
  }

}
