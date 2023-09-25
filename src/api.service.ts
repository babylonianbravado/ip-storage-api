import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { firstValueFrom } from 'rxjs';
import type { Cache } from 'cache-manager';

import { IP_ADDRESS_LOOKUP_ENDPOINT } from 'utils/constants';

@Injectable()
export class ApiService {
    constructor(
        private httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async getIpAddressInfo(ipAddress: string): Promise<any> {
        const cachedIpAddressData = await this.cacheManager.get(ipAddress);
        if (cachedIpAddressData) return cachedIpAddressData;

        const { data: ipAddressData } = await firstValueFrom(this.httpService.get(IP_ADDRESS_LOOKUP_ENDPOINT + '/' + ipAddress));
        this.cacheManager.set(ipAddress, ipAddressData);

        return ipAddressData;
    }
}
