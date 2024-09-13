import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'login' })
  @ApiResponse({ status: 200, description: 'The membro has been successfully logged in.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'senha'],
    },
    description: 'Json structure for login',
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh JWT token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string', example: 'your-refresh-token-here' }, // Exemplo para ilustrar o valor
      },
      required: ['refreshToken'],
    },
    description: 'Requires a refresh token to generate a new JWT token.',
  })
  @ApiResponse({ status: 201, description: 'The new access token.' })
  @ApiResponse({ status: 400, description: 'Invalid refresh token.' })
  refresh(@Body() body: Record<string, any>) {
    return this.authService.refreshToken(body?.refreshToken)
  }
}