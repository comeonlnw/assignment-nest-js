import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/user/entities/users.entity';
import { throwInstanceofError } from 'src/utils/error.util';
import { Brackets, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/createBoard.dto';
import { CreateCommentDto } from './dto/createComment.dto';
import { GetBoardDto } from './dto/getBoard.dto';
import { Board } from './entities/board.entity';
import { Comment } from './entities/comment.entity';
import { Community } from './entities/community.entity';
import { FindAllResultsType } from './types/board.type';

@Injectable()
export class BoardService {
  private readonly logger = new Logger(BoardService.name);

  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getAll(
    body: GetBoardDto,
    user?: Users,
  ): Promise<FindAllResultsType<Board>> {
    try {
      const { community, page, limit, search, isOurBlog } = body;

      const skip = (page - 1) * limit;

      const queryBuilder = this.boardRepository.createQueryBuilder('board');

      queryBuilder.select([
        'board.id',
        'board.username',
        'board.title',
        'board.content',
        'board.createdAt',
        'board.updatedAt',
        'board.deletedAt',
        'board.commentCount',
      ]);

      queryBuilder.leftJoinAndSelect('board.community', 'community');

      if (isOurBlog) {
        queryBuilder.andWhere('board.username = :username', {
          username: user.username,
        });
      }

      if (community) {
        queryBuilder.andWhere('community.id = :communityId', {
          communityId: community,
        });
      }

      if (search) {
        const lowerCaseSearch = search.toLowerCase();

        queryBuilder.andWhere(
          new Brackets((qb) => {
            qb.where('LOWER(board.title) LIKE :searchQuery', {
              searchQuery: `%${lowerCaseSearch}%`,
            }).orWhere('LOWER(board.content) LIKE :searchQu ry', {
              searchQuery: `%${lowerCaseSearch}%`,
            });
          }),
        );
      }

      queryBuilder.skip(skip).take(limit);
      queryBuilder.orderBy('board.createdAt', 'DESC');

      const [items, total] = await queryBuilder.getManyAndCount();

      const totalPages = Math.ceil(total / limit);

      return {
        data: items,
        total,
        page,
        lastPage: totalPages,
      };
    } catch (error: unknown) {
      this.logger.error({
        function: this.getAll.name,
        request: {
          body,
        },
        error,
      });

      throwInstanceofError(error);
    }
  }

  async getBoardById(id: string) {
    try {
      const board = await this.boardRepository.findOne({
        where: { id: id },
        relations: ['comments', 'community'],
        order: {
          comments: {
            createdAt: 'DESC',
          },
        },
      });

      if (!board) {
        throw new NotFoundException(`Board with ID "${id}" not found.`);
      }

      return board;
    } catch (error: unknown) {
      this.logger.error({
        function: this.getBoardById.name,
        error,
        request: {
          id,
        },
      });

      throwInstanceofError(error);
    }
  }

  async createBoard(
    body: CreateBoardDto,
    username: string,
  ): Promise<string | Error> {
    try {
      const { community: communityId, ...boardDetails } = body;

      if (!username) {
        throw new UnauthorizedException();
      }

      const community = await this.communityRepository.findOne({
        where: { id: communityId },
      });

      if (!community) {
        throw new NotFoundException(
          `Community with ID "${communityId}" not found.`,
        );
      }

      const newBoard = this.boardRepository.create({
        ...boardDetails,
        community: community,
        username,
      });

      await this.boardRepository.save(newBoard);

      return 'Success';
    } catch (error: unknown) {
      this.logger.error({
        function: this.createBoard.name,
        request: {
          body,
          username,
        },
        error,
      });

      throwInstanceofError(error);
    }
  }

  async getAllCommunity(): Promise<Community[]> {
    try {
      return await this.communityRepository.find({
        select: ['name', 'id'],
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error: unknown) {
      this.logger.error({
        function: this.getAllCommunity.name,
        error,
      });

      throwInstanceofError(error);
    }
  }

  async createComment(
    id: string,
    body: CreateCommentDto,
    username: string,
  ): Promise<string | Error> {
    try {
      if (!username) {
        throw new UnauthorizedException();
      }

      const findPost = await this.boardRepository.findOne({
        where: { id },
      });

      if (!findPost) {
        throw new NotFoundException(`Board with ID "${id}" not found.`);
      }

      const newComment = this.commentRepository.create({
        username,
        content: body.content,
        board: findPost,
      });

      await this.commentRepository.save(newComment);

      return 'Success';
    } catch (error: unknown) {
      this.logger.error({
        function: this.createBoard.name,
        request: {
          body,
          id,
          username,
        },
        error,
      });

      throwInstanceofError(error);
    }
  }

  async deleteBoard(id: string, user: Users): Promise<string | Error> {
    try {
      const board = await this.boardRepository.findOne({ where: { id } });

      if (!board) {
        throw new NotFoundException(`Board with ID "${id}" not found.`);
      }

      if (board.username !== user.username) {
        throw new ForbiddenException(
          'You are not authorized to delete this board.',
        );
      }

      await this.boardRepository.softDelete(id);

      return 'Delete Success';
    } catch (error: unknown) {
      this.logger.error({
        function: this.deleteBoard.name,
        request: {
          id,
          user: user.username,
        },
        error,
      });

      throwInstanceofError(error);
    }
  }

  async updateBoard(
    id: string,
    body: Partial<Board>,
    user: Users,
  ): Promise<Board> {
    try {
      const board = await this.boardRepository.findOne({
        where: { id },
      });

      if (!board) {
        throw new NotFoundException(
          `Board with ID "${id}" not found or has been deleted.`,
        );
      }

      if (board.username !== user.username) {
        throw new ForbiddenException(
          'You are not authorized to update this board.',
        );
      }

      Object.assign(board, body);

      const updatedBoard = await this.boardRepository.save(board);

      return updatedBoard;
    } catch (error: unknown) {
      this.logger.error({
        function: this.updateBoard.name,
        request: {
          id,
          body,
          user: user.username,
        },
        error,
      });

      throwInstanceofError(error);
    }
  }
}
