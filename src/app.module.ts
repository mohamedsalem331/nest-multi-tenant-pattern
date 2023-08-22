import { Module } from '@nestjs/common';
import { UserModule } from './User/User.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, DatabaseModule.forRootAsync()],
  controllers: [],
  providers: [],
})
export class AppModule {}
