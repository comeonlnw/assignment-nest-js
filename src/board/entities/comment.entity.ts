import { CreateUpdateAndDeleteEntity } from 'src/common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Board } from './board.entity';

@Entity('comment')
export class Comment extends CreateUpdateAndDeleteEntity {
  @Column({ name: 'username', type: 'varchar' })
  username: string;

  @Column({
    name: 'content',
    type: 'text',
  })
  content: string;

  @ManyToOne(() => Board, (board) => board.comments)
  @JoinColumn({ name: 'board_id' })
  board: Board;
}
