import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/guards/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }
}
