/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';

export class UpdateUserDto extends PartialType(RegisterAuthDto) {
    
    @IsString({ message: 'Foydalanuvchi nomi satr (string) bo‘lishi kerak.' })
    @IsNotEmpty({ message: 'Foydalanuvchi nomi bo\'sh bo\'lishi mumkin emas.' })
    username: string;
  
    @IsEmail({}, { message: 'Noto‘g‘ri email formati kiritildi.' })
    @IsNotEmpty({ message: 'Email bo‘sh bo‘lishi mumkin emas.' })
    email: string;
  
    @IsString({ message: 'Parol satr (string) bo‘lishi kerak.' })
    @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak.' })
    password: string;
  
    @IsString({ message: 'Viloyat satr (string) bo‘lishi kerak.' })
    region?: string;
  
    @IsString({ message: 'Tuman satr (string) bo‘lishi kerak.' })
    district?: string;
}
