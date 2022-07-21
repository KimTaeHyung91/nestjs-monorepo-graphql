import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../domain/user.object-type';
import { UserService } from '../service/user.service';
import { UserJoinRequestInputType } from '../dto/user-join-request.input-type';
import { UserModifyInfoRequestInputType } from '../dto/user-modify-info-request.input-type';

@Resolver((of) => User)
export class UserMutation {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, {
    nullable: false,
  })
  async join(
    @Args('joinReqDto') joinReqDto: UserJoinRequestInputType,
  ): Promise<User> {
    try {
      const join = await this.userService.join(joinReqDto.toEntity());
      return new User(join);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => User)
  async modify(
    @Args('ern', { type: () => String }) ern: string,
    @Args('modifyReqDto') modifyReqDto: UserModifyInfoRequestInputType,
  ): Promise<User> {
    try {
      const modify = await this.userService.modify(
        ern,
        modifyReqDto.toEntity(),
      );
      return new User(modify);
    } catch (error) {
      throw new Error(error);
    }
  }
}
