import { InputType, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';


@InputType()
export class NodeDto {
  @Field()
  name: string;

  @Field(() => GraphQLJSONObject)
  properties: Record<string, any>;
}
