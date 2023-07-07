import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Node } from './node.entity';
import { NodeDto } from './node.dto';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NodeService {
  constructor(
    // @InjectRepository(Node)
    // private readonly repository: Repository<Node>,
    private readonly neo4jService: Neo4jService,
  ) {}

  async createNode(input: NodeDto): Promise<Node> {
    // this.repository.create(input);
    const session = this.neo4jService.driverInstance.session();
    const id = uuidv4();
    const result = await session.run(
      'CREATE (n:Node {id: $id, name: $name, properties: $properties}) RETURN n',
      {
        id,
        name: input.name,
        properties: input.properties,
      },
    );
    session.close();

    const createdNode = result.records[0].get('n').properties;
    return { id, ...createdNode };
  }

  async updateNode(id: string, input: NodeDto): Promise<Node> {
    // this.repository.update(id, input);
    const session = this.neo4jService.driverInstance.session();
    const result = await session.run(
      'MATCH (n:Node {id: $id}) SET n.name = $name, n.properties = $properties RETURN n',
      {
        id,
        name: input.name,
        properties: input.properties,
      },
    );
    session.close();

    const updatedNode = result.records[0].get('n').properties;
    return { id, ...updatedNode };
  }

  async deleteNode(id: string): Promise<boolean> {
    // this.repository.delete(id);
    const session = this.neo4jService.driverInstance.session();
    await session.run('MATCH (n:Node {id: $id}) DETACH DELETE n', { id });
    session.close();
    return true;
  }

  async getNode(id: string): Promise<Node> {
    // this.repository.find({ where: { id } });

    const session = this.neo4jService.driverInstance.session();
    const result = await session.run('MATCH (n:Node {id: $id}) RETURN n', {
      id,
    });
    session.close();

    if (!result.records.length) {
      return null;
    }

    const node = result.records[0].get('n').properties;
    return { id, ...node };
  }

  async getAllNodes(): Promise<Node[]> {
    // this.repository.find();
    const session = this.neo4jService.driverInstance.session();
    const result = await session.run('MATCH (n:Node) RETURN n');
    session.close();

    return result.records.map((record) => {
      const node = record.get('n').properties;
      return { id: node.id, ...node };
    });
  }
}
