import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cat} from "./cats/entities/Cat";

@Module({
  imports: [CatsModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "deimos",
    password: "123",
    database: "deimos",
    entities: [Cat],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
