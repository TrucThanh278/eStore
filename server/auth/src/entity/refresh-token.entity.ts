import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  typeBoolean,
  typeNumber,
  typeString,
  typeTimestamp,
} from './database.type';
import { DEFAULT_TIMESTAMP } from '../common/constant/database.constant';

@Entity({
  name: 'refresh_token',
})
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column(typeNumber)
  userId?: number;

  @Column(typeString)
  ip?: string;

  @Column(typeString)
  userAgent?: string;

  @Index()
  @Column({
    ...typeString,
    nullable: true,
  })
  browser?: string;

  @Index()
  @Column({
    ...typeString,
    nullable: true,
  })
  os?: string;

  @Column(typeBoolean)
  isRevoked?: boolean;

  @Column({
    ...typeTimestamp,
    default: () => `${DEFAULT_TIMESTAMP} + INTERVAL 7 DAY`,
  })
  expires?: Date;
}
