/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editedFileName } from 'src/utilities/file-helper';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { Roles } from 'src/shared/guard/roles.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './public/uploads',
          filename: editedFileName,
        }),
      }),
    )
  create(@Body() createProductDto: CreateProductDto, @UploadedFile() image: Express.Multer.File) {
    return this.productService.create(createProductDto, image );
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: editedFileName,
      }),
    }),
  )
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFile() image: Express.Multer.File) {
    return this.productService.update(+id, updateProductDto, image);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
