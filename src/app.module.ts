import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CatEntity} from "./cats/entities/Cat.entity";

@Module({
  imports: [CatsModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
