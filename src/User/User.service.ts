import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/models';
// import { SequelizeProvider } from 'src/dbinit.provider';

@Injectable()
export class UserService {
  constructor(
    @Inject('SEQUELIZE')
    private readonly mySequelize: Sequelize,
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async findUserById(id: string) {
    // we have access to both sequelize instance the model both DI injected
    return this.userRepository.findByPk(id);
  }
}
