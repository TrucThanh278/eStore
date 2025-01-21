import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { typeTimestamp } from './database.type';

/**
 * custom base entity
 */
export abstract class CustomBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn(typeTimestamp)
  createdAt?: Date;

  @UpdateDateColumn({
    ...typeTimestamp,
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt?: Date;
}
