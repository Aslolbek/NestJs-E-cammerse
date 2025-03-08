/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';

export class UpdateUserDto extends PartialType(RegisterAuthDto) {
    
    @ApiProperty({ example: 'johndoe', description: 'Foydalanuvchi nomi', required: false })
    @IsString({ message: 'Foydalanuvchi nomi satr (string) bo‘lishi kerak.' })
    @IsNotEmpty({ message: 'Foydalanuvchi nomi bo\'sh bo\'lishi mumkin emas.' })
    username: string;
  
    @ApiProperty({ example: 'johndoe@example.com', description: 'Foydalanuvchi emaili', required: false })
    @IsEmail({}, { message: 'Noto‘g‘ri email formati kiritildi.' })
    @IsNotEmpty({ message: 'Email bo‘sh bo‘lishi mumkin emas.' })
    email: string;
  
    @ApiProperty({ example: 'SecurePass123', description: 'Foydalanuvchi paroli', required: false })
    @IsString({ message: 'Parol satr (string) bo‘lishi kerak.' })
    @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak.' })
    password: string;
  
    @ApiProperty({ example: 'Toshkent', description: 'Foydalanuvchi viloyati', required: false })
    @IsString({ message: 'Viloyat satr (string) bo‘lishi kerak.' })
    region?: string;
  
    @ApiProperty({ example: 'Yunusobod', description: 'Foydalanuvchi tumani', required: false })
    @IsString({ message: 'Tuman satr (string) bo‘lishi kerak.' })
    district?: string;
}
