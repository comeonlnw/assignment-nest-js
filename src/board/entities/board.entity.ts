import { CreateUpdateAndDeleteEntity } from 'src/common/entities/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  VirtualColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Community } from './community.entity';

@Entity('board')
export class Board extends CreateUpdateAndDeleteEntity {
  @Column({ name: 'username', type: 'varchar' })
  username: string;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({
    name: 'content',
    type: 'text',
  })
  content: string;

  @ManyToOne(() => Community, (community) => community.boards)
  @JoinColumn({ name: 'community_id' })
  community: Community;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];

  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT(comment.id) FROM comment comment WHERE comment.board_id = ${alias}.id`,
  })
  commentCount: number;
}
