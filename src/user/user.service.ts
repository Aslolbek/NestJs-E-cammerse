/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>,
  ) {}  


  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Foydalanuvchi topilmadi! ID: ${id}`);
      }

      return { message: 'Foydalanuvchi topildi!', data: user };
    } catch (error) {
      throw new InternalServerErrorException('Serverda xatolik yuz berdi, iltimos keyinroq urinib ko‘ring!');
    }
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    try {
      const userChek = await this.usersRepository.findOne({ where: { id: user.id } });
  
      if (!userChek) {
        throw new NotFoundException(`Foydalanuvchi topilmadi! ID: ${user.id}`);
      }
  
      Object.keys(updateUserDto).forEach(key => {
        if (updateUserDto[key] === undefined) {
          delete updateUserDto[key];
        }
      });
  

      Object.assign(userChek, updateUserDto);
      await this.usersRepository.save(userChek);
  
      return { message: 'Foydalanuvchi yangilandi!', data: userChek };
    } catch (error) {
      throw new InternalServerErrorException(
        'Serverda xatolik yuz berdi, iltimos keyinroq urinib ko‘ring!',
      );
    }
  }

  async remove(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Foydalanuvchi topilmadi! ID: ${id}`);
      }

      await this.usersRepository.remove(user);

      return { message: `Foydalanuvchi muvaffaqiyatli o‘chirildi! ID: ${id}` };
    } catch (error) {
      throw new InternalServerErrorException('Serverda xatolik yuz berdi, iltimos keyinroq urinib ko‘ring!');
    }
  }
}
