import {
  Entity,
  Column,
  Index,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CustomBaseEntity } from './custom-base.entity';
import { Exclude } from 'class-transformer';
import { UserStatusEnum } from '../common/enums/user-status.enum';
import { RoleEntity } from './role.entity';
import {
  typeBoolean,
  typeNumber,
  typeString,
  typeTimestamp,
} from './database.type';

@Entity({
  name: 'user',
})
export class UserEntity extends CustomBaseEntity {
  @Index({
    unique: true,
  })
  @Column(typeString)
  username?: string;

  @Index({
    unique: true,
  })
  @Column(typeString)
  email?: string;

  @Column(typeString)
  @Exclude({
    toPlainOnly: true,
  })
  password?: string;

  @Index()
  @Column(typeString)
  name?: string;

  @Column(typeString)
  address?: string;

  @Column({ ...typeString, nullable: true })
  contact?: string;

  @Column({ ...typeString, nullable: true })
  avatar?: string;

  @Column({ ...typeString, nullable: true })
  status?: UserStatusEnum;

  @Column({ ...typeString, nullable: true })
  @Exclude({
    toPlainOnly: true,
  })
  token?: string;

  @CreateDateColumn({
    ...typeTimestamp,
    nullable: true,
  })
  tokenValidityDate?: Date;

  @Column({ ...typeString, nullable: true, default: '10' })
  @Exclude({
    toPlainOnly: true,
  })
  salt?: string;

  @Column({ ...typeString, nullable: true })
  @Exclude({
    toPlainOnly: true,
  })
  twoFASecret?: string;

  @Exclude({
    toPlainOnly: true,
  })
  @CreateDateColumn(typeTimestamp)
  twoFAThrottleTime?: Date;

  @Column({
    ...typeBoolean,
    nullable: true,
  })
  isTwoFAEnabled?: boolean;

  @Exclude({
    toPlainOnly: true,
  })
  skipHashPassword = false;

  @OneToOne(() => RoleEntity)
  @JoinColumn()
  role?: RoleEntity;

  @Column({ ...typeNumber, nullable: true })
  roleId?: number;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password && !this.skipHashPassword) {
      await this.hashPassword();
    }
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password && !this.skipHashPassword) {
      await this.hashPassword();
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt ?? 10);
    return hash === this.password;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password ?? '', this.salt ?? 10);
  }
}
