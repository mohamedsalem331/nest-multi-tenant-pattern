import { Sequelize } from 'sequelize-typescript';
import {
  Module,
  DynamicModule,
  Scope,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { getDatabaseFactoryProvider } from './database.provider';

const connections: Map<string, Sequelize> = new Map();

const databaseProviderFactory = {
  provide: 'SEQUELIZE',
  scope: Scope.REQUEST,
  useFactory: async (req: Request) =>
    await getDatabaseFactoryProvider(connections, req.body['clientInfo']),
  inject: [REQUEST],
};

@Global()
@Module({})
export class DatabaseModule implements OnApplicationShutdown {
  async onApplicationShutdown() {
    const closedConnectionPromises = [];
    Array.from(connections.values()).forEach((connection) =>
      closedConnectionPromises.push(connection.close()),
    );
    Promise.all(closedConnectionPromises);
  }
  static forRootAsync(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [],
      providers: [databaseProviderFactory],
      exports: [databaseProviderFactory],
    };
  }
}
