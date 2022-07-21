import {Field, InputType} from '@nestjs/graphql';
import {UserEntity} from '../domain/user.entity';

@InputType()
export class UserJoinRequestInputType {
  @Field()
  private email: string;

  @Field()
  private phone: string;

  @Field()
  private password: string;

  toEntity() {
    return UserEntity.join(this.email, this.phone, this.password);
  }
}