import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetBoardDto {
  @IsString()
  @IsOptional()
  community: string;

  @IsNumberString()
  @IsOptional()
  page: number;

  @IsNumberString()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  search: string;

  @IsBooleanString()
  @IsOptional()
  isOurBlog: boolean;
}
