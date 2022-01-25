import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CatEntity} from "./cats/entities/Cat.entity";

@Module({
  imports: [CatsModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT) ||  5432,
    username: process.env.POSTGRES_USER || "deimos",
    password: process.env.POSTGRES_PASSWORD || "123",
    database: process.env.POSTGRES_DB || "deimos",
    synchronize: false,
    entities: [
      "dist/**/*.entity{.ts,.js}"
    ],
    migrations: [
      "src/migrations/*.ts"
    ],
    cli: {
      "migrationsDir": "migrations"
    }
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
