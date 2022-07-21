import { Field, InputType } from '@nestjs/graphql';
import { UserEntity } from '../domain/user.entity';

@InputType()
export class UserModifyInfoRequestInputType {
  @Field({ nullable: true })
  private phone?: string;

  @Field({ nullable: true })
  private password?: string;

  @Field({ nullable: true })
  private status?: string;

  toEntity() {
    return UserEntity.modify({
      phone: this.phone,
      password: this.password,
      status: this.status,
    });
  }
}