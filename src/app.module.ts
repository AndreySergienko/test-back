import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import SqlDatabase from './database/samples/SqlDatabase';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot(new SqlDatabase().connect([])),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
