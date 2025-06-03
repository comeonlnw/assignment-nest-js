import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID('4')
  community: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}
