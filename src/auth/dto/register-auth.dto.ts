/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterAuthDto {

    @ApiProperty({ example: 'JohnDoe', description: 'Foydalanuvchi nomi' })
    @IsString({ message: 'Foydalanuvchi nomi satr (string) bo‘lishi kerak.' })
    @IsNotEmpty({ message: 'Foydalanuvchi nomi bo‘sh bo‘lishi mumkin emas.' })
    username: string;
  
    @ApiProperty({ example: 'johndoe@example.com', description: 'Foydalanuvchi email manzili' })
    @IsEmail({}, { message: 'Noto‘g‘ri email formati kiritildi.' })
    @IsNotEmpty({ message: 'Email bo‘sh bo‘lishi mumkin emas.' })
    email: string;
  
    @ApiProperty({ example: 'password123', description: 'Foydalanuvchi paroli (kamida 6 ta belgi)' })
    @IsString({ message: 'Parol satr (string) bo‘lishi kerak.' })
    @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak.' })
    password: string;
  
    @ApiPropertyOptional({ example: 'Toshkent', description: 'Foydalanuvchining viloyati (ixtiyoriy)' })
    @IsString({ message: 'Viloyat satr (string) bo‘lishi kerak.' })
    region?: string;
  
    @ApiPropertyOptional({ example: 'Chilonzor', description: 'Foydalanuvchining tumani (ixtiyoriy)' })
    @IsString({ message: 'Tuman satr (string) bo‘lishi kerak.' })
    district?: string;
}
