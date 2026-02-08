import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { CoffeeModule } from '../coffee/coffee.module';

@Module({
    imports: [CoffeeModule],
    controllers: [PaymentsController],
})
export class PaymentsModule { }
