/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({ message: 'Mahsulot nomi bo‘sh bo‘lishi mumkin emas' })
    @IsString({ message: 'Mahsulot nomi matn (string) bo‘lishi kerak' })
    name: string;
  
    @IsNotEmpty({ message: 'Tavsif bo‘sh bo‘lishi mumkin emas' })
    @IsString({ message: 'Tavsif matn (string) bo‘lishi kerak' })
    description: string;
  
    @IsNotEmpty({ message: 'Narx bo‘sh bo‘lishi mumkin emas' })
    @IsNumber({}, { message: 'Narx son (number) bo‘lishi kerak' })
    @Min(0, { message: 'Narx 0 dan kam bo‘lishi mumkin emas' })
    @Type(() => Number)
    price: number;
  
    @IsNotEmpty({ message: 'Ombordagi miqdor bo‘sh bo‘lishi mumkin emas' })
    @IsNumber({}, { message: 'Ombordagi miqdor son (number) bo‘lishi kerak' })
    @Min(0, { message: 'Ombordagi miqdor 0 dan kam bo‘lishi mumkin emas' })
    @Type(() => Number)
    stock: number;
  
    @IsNotEmpty({ message: 'Kategoriya ID bo‘sh bo‘lishi mumkin emas' })
    @IsNumber({}, { message: 'Kategoriya ID son (number) bo‘lishi kerak' })
    @Type(() => Number)
    categoryId: number;
}
