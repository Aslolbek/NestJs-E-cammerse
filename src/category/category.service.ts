/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class CategoryService {
constructor(
  @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
){}

async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {

  const { name, description } = createCategoryDto;

  const newCategory = this.categoryRepository.create({
    name,
    description,
    image: image.path
  });

  return await this.categoryRepository.save(newCategory);
}

async findAll() {
  return await this.categoryRepository.find();
}

async findOne(id: number) {
  const category = await this.categoryRepository.findOne({ where: { id } });
  if (!category) throw new NotFoundException(`Catagory topilmadi ${id}`);
  return category;
}

async update(id: number, updateCategoryDto: UpdateCategoryDto, image?: Express.Multer.File): Promise<{message: string, updateCategory: Category}>{

  const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Kategoriya topilmadi');
    }


    if (image && category.image) {
        try {
          fs.unlinkSync(category.image);
          category.image = image.path;
        } catch (error) {
          throw new InternalServerErrorException(`Eski rasmni o‘chirishda xatolik yuz berdi ${error.message}`);
        }
    }

    Object.assign(category, updateCategoryDto);
   const updateCategory = await this.categoryRepository.save(category);
   
    return {
      message:`Kategorya yangilandi `,
      updateCategory
    }
  }


async remove(id: number) {
  const category = await this.categoryRepository.findOne({ where: { id } });

  if (!category) {
    throw new NotFoundException(`Kategoriya topilmadi! (ID: ${id})`);
  }

  if (category.image) {
   fs.unlinkSync(category.image);
  }

  await this.categoryRepository.remove(category);
  return { message: 'Kategoriya muvaffaqiyatli o‘chirildi!' };
}
}
