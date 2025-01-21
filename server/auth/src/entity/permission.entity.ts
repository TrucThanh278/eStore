import { Column, Entity, Index, ManyToMany } from 'typeorm';

import { CustomBaseEntity } from './custom-base.entity';
import { RoleEntity } from './role.entity';
import { typeBoolean, typeString } from './database.type';

@Entity({
  name: 'permission',
})
export class PermissionEntity extends CustomBaseEntity {
  @Column(typeString)
  resource?: string;

  @Column(typeString)
  @Index({
    unique: true,
  })
  description?: string;

  @Column(typeString)
  path?: string;

  @Column({
    ...typeString,
    default: 'get',
    length: 20,
  })
  method?: string;

  @Column(typeBoolean)
  isDefault?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => RoleEntity, (role) => role.permission)
  role?: RoleEntity[];

  constructor(data?: Partial<PermissionEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
