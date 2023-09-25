import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { ApiController } from './api.constroller';
import { ApiService } from './api.service';

import validate from './config/validate';

import { REDIS_HOST, REDIS_PORT, REDIS_DEFAULT_TTL } from 'utils/constants';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ validate, isGlobal: true }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory:
        async (configService: ConfigService) => <RedisClientOptions>({
          store: redisStore,
          host: configService.get(REDIS_HOST),
          port: configService.get(REDIS_PORT),
          ttl: REDIS_DEFAULT_TTL
        }),
      inject: [ConfigService],
    })
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule { }
