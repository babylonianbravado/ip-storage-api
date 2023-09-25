import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { REDIS_HOST, REDIS_PORT } from 'utils/constants';

import { ApiController } from './api.constroller';
import { ApiService } from './api.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory:
        async (configService: ConfigService) => <RedisClientOptions>({
          isGlobal: true,
          store: redisStore,
          host: configService.get(REDIS_HOST),
          port: configService.get(REDIS_PORT)
        }),
      inject: [ConfigService],
    })
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule { }
