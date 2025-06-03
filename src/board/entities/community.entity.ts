import { CreateUpdateAndDeleteEntity } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Board } from './board.entity';

@Entity('community')
export class Community extends CreateUpdateAndDeleteEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @OneToMany(() => Board, (board) => board.community)
  boards: Board[];
}
