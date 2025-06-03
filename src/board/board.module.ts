import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/board/entities/board.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Comment } from './entities/comment.entity';
import { Community } from './entities/community.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Community, Comment])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
