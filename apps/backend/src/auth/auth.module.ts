import config, { type AuthConfig } from './config'
import { JwtAuthGuard } from './jwtAuth/jwtAuth.guard'
import { JwtAuthStrategy } from './jwtAuth/jwtAuth.strategy'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forFeature(config),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(config)],
      useFactory: async (configService: ConfigService<AuthConfig, true>) => ({
        secret: configService.getOrThrow('auth.secret', { infer: true }),
        signOptions: {
          expiresIn: '1h', // Auth tokens are short lived while refresh tokens (not implemented) are long lived
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtAuthStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // We lock all endpoints by default
    },
  ],
})
export class AuthModule {}
