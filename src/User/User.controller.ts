import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UserService } from './User.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/:id')
  getUser(@Param('id') id: string, @Req() request: Request) {
    return this.userService.findUserById(id);
  }
}
