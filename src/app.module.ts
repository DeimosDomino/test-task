import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ormconfig} from "./cats/ormconfig";
import {CatsModule} from "./cats/cats.module";
import {GraphQLModule} from "@nestjs/graphql";


@Module({
  imports: [CatsModule,
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: false,
      playground: false,
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
