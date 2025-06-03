import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorator/get-user.decorator';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { Public } from 'src/guards/public.decorator';
import { Users } from 'src/user/entities/users.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { CreateCommentDto } from './dto/createComment.dto';
import { GetBoardDto } from './dto/getBoard.dto';
import { Board } from './entities/board.entity';
import { Community } from './entities/community.entity';
import { FindAllResultsType } from './types/board.type';

@Controller('board')
@Public()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/')
  async getBoards(
    @Query() query: GetBoardDto,
  ): Promise<FindAllResultsType<Board>> {
    return await this.boardService.getAll({
      limit: 10,
      page: 1,
      ...query,
    });
  }

  @Get('/our')
  async getOurBoards(
    @GetUser() user: Users,
    @Query() query: GetBoardDto,
  ): Promise<FindAllResultsType<Board>> {
    return await this.boardService.getAll(
      {
        limit: 10,
        page: 1,
        ...query,
      },
      user,
    );
  }

  @Get('/community')
  async getCommunity(): Promise<Community[]> {
    return await this.boardService.getAllCommunity();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.boardService.getBoardById(id);
  }

  @UseGuards(JwtGuard)
  @Post('/')
  async CreateBoard(
    @Body() body: CreateBoardDto,
    @GetUser() user: Users,
  ): Promise<string | Error> {
    return await this.boardService.createBoard(body, user?.username);
  }

  @UseGuards(JwtGuard)
  @Post(':id/comment')
  async CreateComment(
    @Body() body: CreateCommentDto,
    @Param('id') param: string,
    @GetUser() user: Users,
  ): Promise<string | Error> {
    return await this.boardService.createComment(param, body, user?.username);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async DeleteBoard(
    @Param('id') id: string,
    @GetUser() user: Users,
  ): Promise<string | Error> {
    return await this.boardService.deleteBoard(id, user);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async UpdateBoard(
    @Param('id') id: string,
    @Body() body: Partial<Board>,
    @GetUser() user: Users,
  ): Promise<Board> {
    return await this.boardService.updateBoard(id, body, user);
  }
}
