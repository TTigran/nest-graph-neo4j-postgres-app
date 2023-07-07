import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { Entity } from 'typeorm';
@Entity()
@ObjectType()
export class Node {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => GraphQLJSONObject)
  properties: Record<string, any>;
}
