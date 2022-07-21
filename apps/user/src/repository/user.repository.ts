import {InjectEntityManager} from '@nestjs/typeorm';
import {EntityManager} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {UserEntity} from '../domain/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectEntityManager()
        private readonly manager: EntityManager,
    ) {
    }

    async findOne(ern: string): Promise<UserEntity> {
        return await this.manager
            .findOneOrFail(UserEntity, {
                ern,
            })
            .catch(() => null);
    }

    async save(user: UserEntity): Promise<UserEntity> {
        return await this.manager.save(UserEntity, user);
    }

    async update(ern: string, user: UserEntity): Promise<UserEntity> {
        await this.manager.update(UserEntity, ern, user);
        return await this.manager.findOneOrFail(UserEntity, ern);
    }
}