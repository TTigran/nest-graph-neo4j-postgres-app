import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeResolver } from './node.resolver';
import { Neo4jService } from '../neo4j/neo4j.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './node.entity';

@Module({
  imports: [
    // Other required imports
  ],
  providers: [NodeService, NodeResolver, Neo4jService],
})
export class NodeModule {}
