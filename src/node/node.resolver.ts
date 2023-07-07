import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { NodeService } from './node.service';
import { Node } from './node.entity';
import { NodeDto } from './node.dto';

@Resolver(() => Node)
export class NodeResolver {
  constructor(private readonly nodeService: NodeService) {}
  /**
   * query GetNode($id: String!) {
   *   getNode(id: $id) {
   *     id
   *     name
   *     properties
   *   }
   * }
   */
  @Query(() => Node)
  async getNode(@Args('id', { type: () => ID }) id: string): Promise<Node> {
    return this.nodeService.getNode(id);
  }
  /**
   * query GetAllNodes {
   *   getAllNodes {
   *     id
   *     name
   *     properties
   *   }
   * }
   */
  @Query(() => [Node])
  async getAllNodes(): Promise<Node[]> {
    return this.nodeService.getAllNodes();
  }
  /**
   * mutation CreateNode($input: NodeDto!) {
   *   createNode(input: $input) {
   *     id
   *     name
   *     properties
   *   }
   * }
   */
  @Mutation(() => Node)
  async createNode(@Args('input') input: NodeDto): Promise<Node> {
    return this.nodeService.createNode(input);
  }
  /**
   * mutation UpdateNode($id: ID!, $input: NodeDto!) {
   *   updateNode(id: $id, input: $input) {
   *     id
   *     name
   *     properties
   *   }
   * }
   */
  @Mutation(() => Node)
  async updateNode(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: NodeDto,
  ): Promise<Node> {
    return this.nodeService.updateNode(id, input);
  }
  /**
   * mutation DeleteNode($id: ID!) {
   *   deleteNode(id: $id)
   * }
   */
  @Mutation(() => Boolean)
  async deleteNode(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.nodeService.deleteNode(id);
  }
}
