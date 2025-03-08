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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { editedFileName } from 'src/utilities/file-helper';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { Roles } from 'src/shared/guard/roles.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


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
  create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() image: Express.Multer.File) {
    return this.categoryService.create(createCategoryDto, image);
  }


  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
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
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.categoryService.update(+id, updateCategoryDto, image);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
