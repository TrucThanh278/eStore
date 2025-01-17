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

@Entity({
  name: 'user',
})
export class UserEntity extends CustomBaseEntity {
  @Index({
    unique: true,
  })
  @Column()
  username: string;

  @Index({
    unique: true,
  })
  @Column()
  email: string;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Index()
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column()
  avatar: string;

  @Column()
  status: UserStatusEnum;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  token: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  tokenValidityDate: Date;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  salt: string;

  @Column({
    nullable: true,
  })
  @Exclude({
    toPlainOnly: true,
  })
  twoFASecret?: string;

  @Exclude({
    toPlainOnly: true,
  })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  twoFAThrottleTime?: Date;

  @Column({
    default: false,
  })
  isTwoFAEnabled: boolean;

  @Exclude({
    toPlainOnly: true,
  })
  skipHashPassword = false;

  @OneToOne(() => RoleEntity)
  @JoinColumn()
  role: RoleEntity;

  @Column()
  roleId: number;

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
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}
