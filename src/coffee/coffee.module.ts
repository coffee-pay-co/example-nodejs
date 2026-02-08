import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoffeeSDK } from 'coffee-pay-sdk';

@Global()
@Module({
    providers: [
        {
            provide: CoffeeSDK,
            useFactory: (configService: ConfigService) => {
                return new CoffeeSDK({
                    apiKey: configService.get<string>('apiKey')!,
                    apiSecret: configService.get<string>('apiSecret')!,
                    baseUrl: configService.get<string>('pasarelaApi')!,
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: [CoffeeSDK],
})
export class CoffeeModule { }
