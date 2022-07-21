import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from './user.entity';

// User 도메인 클래스
@ObjectType()
export class User {
  private readonly _ern: string;
  private readonly _email: string;
  private readonly _phone: string;
  private readonly _password: string;
  private readonly _status: string;

  constructor(userEntity: UserEntity) {
    if (!userEntity) {
      throw new Error('유저 정보가 없습니다.');
    }
    this._ern = userEntity.ern;
    this._email = userEntity.email;
    this._phone = userEntity.phone;
    this._password = userEntity.password;
    this._status = userEntity.status;
  }

  @Field(() => ID)
  get ern(): string {
    return this._ern;
  }

  @Field(() => String)
  get email(): string {
    return this._email;
  }

  @Field(() => String)
  get phone(): string {
    return this._phone;
  }

  @Field(() => String)
  get password(): string {
    return this._password;
  }

  @Field(() => String)
  get status(): string {
    return this._status;
  }
}
