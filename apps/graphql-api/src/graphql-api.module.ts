import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { UserQuery } from './resolver/user.query';
import { UserRepository } from './repository/user.repository';
import { UserMutation } from './resolver/user.mutation';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 13306,
      host: 'localhost',
      username: 'root',
      password: 'root',
      logging: true,
      synchronize: false,
      entities: [UserEntity],
      database: 'user',
    }),
  ],
  providers: [UserService, UserRepository, UserQuery, UserMutation],
})
export class GraphqlApiModule {
  constructor() {
    initializeTransactionalContext();
  }
}
