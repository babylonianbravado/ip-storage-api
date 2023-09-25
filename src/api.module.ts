import { Module } from '@nestjs/common';

import { ApiController } from './api.constroller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
