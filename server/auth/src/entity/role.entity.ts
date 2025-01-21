import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';

import { CustomBaseEntity } from './custom-base.entity';
import { PermissionEntity } from './permission.entity';
import { typeString, typeText } from './database.type';

@Entity({
  name: 'role',
})
export class RoleEntity extends CustomBaseEntity {
  @Column(typeString)
  @Index({
    unique: true,
  })
  name?: string;

  @Column(typeText)
  description?: string;

  @ManyToMany(() => PermissionEntity, (permission) => permission.role)
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permissionId',
      referencedColumnName: 'id',
    },
  })
  permission?: PermissionEntity[];

  constructor(data?: Partial<RoleEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
