import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoffeeSDK, CryptoUtils } from 'coffee-pay-sdk';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly configService: ConfigService,
    private readonly coffeeSDK: CoffeeSDK,
  ) {}

  @Get('signature')
  generateSignature(@Query('timestamp') timestamp: string) {
    const accountKey = this.configService.get<string>('accountKey')!;
    const integrityKey = this.configService.get<string>('integrityKey')!;

    const signature = CryptoUtils.generateWebSignature(
      accountKey,
      integrityKey,
      Number(timestamp),
    );

    return { signature };
  }

  @Get('methods')
  async getPaymentMethods() {
    try {
      return await this.coffeeSDK.paymentMethods.list();
    } catch (error) {
      console.error('Backend Error:', error.message);
      if (error.response) {
        console.error(
          'Backend Response Data:',
          JSON.stringify(error.response.data),
        );
        console.error('Backend Response Status:', error.response.status);
      }
      throw error;
    }
  }

  @Get('config')
  getConfig() {
    return {
      accountKey: this.configService.get<string>('accountKey'),
      currencyId: '988edfd9-1407-451b-b9ca-857f2858f95d',
      baseUrl: this.configService.get<string>('widgetBaseUrl'),
      checkoutBaseUrl: this.configService.get<string>('widgetCheckoutUrl'),
      scriptUrl: this.configService.get<string>('widgetScriptUrl'),
    };
  }
}
