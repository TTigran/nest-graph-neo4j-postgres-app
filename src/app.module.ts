import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NodeModule } from './node/node.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    NodeModule,
  ],
})
export class AppModule {}
