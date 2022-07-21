import { Column, Entity, PrimaryColumn } from 'typeorm';
import {
  DateTimeFormatter,
  Instant,
  LocalDateTime,
  ZoneId,
} from '@js-joda/core';
import { GenerateCodeUtil } from '../../../../libs/util/generate-code-util';

// 유저 엔티티 클래스
@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  ern: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('text')
  password: string;

  @Column({
    default: 'ACTIVE',
  })
  status: string;

  @Column('timestamp', {
    transformer: {
      to(value: LocalDateTime): Date {
        return new Date(
          value.format(DateTimeFormatter.ofPattern('yyyy-MM-dd')).toString(),
        );
      },
      from(value: Date): LocalDateTime {
        return Instant.ofEpochMilli(value.getTime())
          .atZone(ZoneId.systemDefault())
          .toLocalDateTime();
      },
    },
    default: LocalDateTime.now(),
  })
  createdAt: LocalDateTime;

  @Column('timestamp', {
    transformer: {
      to(value: LocalDateTime): Date {
        return new Date(
          value.format(DateTimeFormatter.ofPattern('yyyy-MM-dd')).toString(),
        );
      },
      from(value: Date): LocalDateTime {
        return Instant.ofEpochMilli(value.getTime())
          .atZone(ZoneId.systemDefault())
          .toLocalDateTime();
      },
    },
    default: LocalDateTime.now(),
  })
  updatedAt: LocalDateTime;

  static of(
    ern: string,
    email: string,
    phone: string,
    password: string,
    status: string,
  ): UserEntity {
    const user = new UserEntity();
    user.ern = ern;
    user.email = email;
    user.phone = phone;
    user.password = password;
    user.status = status;

    return user;
  }

  static join(email: string, phone: string, password: string): UserEntity {
    const user = new UserEntity();
    user.ern = GenerateCodeUtil.generateUUID();
    user.email = email;
    user.phone = phone;
    user.password = password;

    return user;
  }

  static modify(info: {
    phone?: string;
    password?: string;
    status?: string;
  }): UserEntity {
    const user = new UserEntity();

    if (info.phone) {
      user.phone = info.phone;
    }

    if (info.password) {
      user.password = info.password;
    }

    if (info.status) {
      user.status = info.status;
    }

    return user;
  }
}
