/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Smartphone', description: 'Mahsulot nomi' })
    @IsNotEmpty({ message: 'Mahsulot nomi bo‘sh bo‘lishi mumkin emas' })
    @IsString({ message: 'Mahsulot nomi matn (string) bo‘lishi kerak' })
    name: string;
  
    @ApiProperty({ example: 'Latest model smartphone with 128GB storage', description: 'Mahsulot tavsifi' })
    @IsNotEmpty({ message: 'Tavsif bo‘sh bo‘lishi mumkin emas' })
    @IsString({ message: 'Tavsif matn (string) bo‘lishi kerak' })
    description: string;
  
    @ApiProperty({ example: 999.99, description: 'Mahsulot narxi' })
    @IsNotEmpty({ message: 'Narx bo‘sh bo‘lishi mumkin emas' })
    @IsNumber({}, { message: 'Narx son (number) bo‘lishi kerak' })
    @Min(0, { message: 'Narx 0 dan kam bo‘lishi mumkin emas' })
    @Type(() => Number)
    price: number;
  
    @ApiProperty({ example: 50, description: 'Ombordagi mavjud miqdor' })
    @IsNotEmpty({ message: 'Ombordagi miqdor bo‘sh bo‘lishi mumkin emas' })
    @IsNumber({}, { message: 'Ombordagi miqdor son (number) bo‘lishi kerak' })
    @Min(0, { message: 'Ombordagi miqdor 0 dan kam bo‘lishi mumkin emas' })
    @Type(() => Number)
    stock: number;
  
    @ApiProperty({ example: 1, description: 'Mahsulot tegishli bo‘lgan kategoriya ID' })
    @IsNotEmpty({ message: 'Kategoriya ID bo‘sh bo‘lishi mumkin emas' })
    @IsNumber({}, { message: 'Kategoriya ID son (number) bo‘lishi kerak' })
    @Type(() => Number)
    categoryId: number;
}
