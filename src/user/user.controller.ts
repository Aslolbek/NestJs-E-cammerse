/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { Roles } from 'src/shared/guard/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Patch()
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
