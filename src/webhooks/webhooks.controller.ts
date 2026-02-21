import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Logger,
    Headers,
    UnauthorizedException,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CryptoUtils } from 'coffee-pay-sdk';

@Controller('webhooks')
export class WebhooksController {
    private readonly logger = new Logger(WebhooksController.name);

    constructor(private readonly configService: ConfigService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    handleWebhook(
        @Headers('x-coffee-pay-signature') signature: string,
        @Body() payload: any,
    ) {
        // 1. Verificar firma
        const integrityKey = this.configService.get<string>('integrityKey');
        if (!integrityKey) {
            this.logger.error('No integrity key configured in environment');
            throw new InternalServerErrorException('Integrity key missing');
        }

        const isValid = CryptoUtils.verifyWebhookSignature(payload, signature, integrityKey);

        if (!isValid) {
            this.logger.error('!!! Firma de webhook inválida !!!');
            throw new UnauthorizedException('Invalid signature');
        }

        this.logger.log('Evento verificado y recibido de Coffee-Pay:');
        this.logger.log(JSON.stringify(payload, null, 2));

        return {
            status: 'success',
            message: 'Event received and verified successfully',
        };
    }
}
