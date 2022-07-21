import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../domain/user.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  @Transactional()
  async findUser(userErn: string) {
    return await this.userRepository.findOne(userErn);
  }

  @Transactional()
  async join(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  @Transactional()
  async modify(ern: string, user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.update(ern, user);
  }
}
