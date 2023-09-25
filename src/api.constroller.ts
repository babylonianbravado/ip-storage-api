import { Controller, Get, Param } from '@nestjs/common';

import { ApiService } from './api.service';

@Controller('info')
export class ApiController {
    constructor(private apiService: ApiService) { }

    @Get(':ipAddress')
    getIpAddressInfo(@Param('ipAddress') ipAddress: string): Promise<any> {
        return this.apiService.getIpAddressInfo(ipAddress);
    }
}
