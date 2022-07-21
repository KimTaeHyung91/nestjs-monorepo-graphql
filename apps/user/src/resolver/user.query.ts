import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../domain/user.object-type';
import { UserService } from '../service/user.service';

@Resolver((of) => User)
export class UserQuery {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, {
    nullable: true,
  })
  async user(@Args('userErn', { type: () => String }) userErn: string) {
    const user = await this.userService.findUser(userErn);
    return new User(user);
  }
}
