import { CreateUpdateAndDeleteEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class Users extends CreateUpdateAndDeleteEntity {
  @Column({ nullable: true, name: 'username', type: 'varchar' })
  username: string;
}
