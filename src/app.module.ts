import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { EnvConfigurations } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation.schema';

import { SubscriptionsPlansModule } from './subscriptions/subscriptions-plans/subscriptions-plans.module';
import { ProductsModule } from './products/products.module';
import { CoffeeModule } from './coffee/coffee.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfigurations],
      validationSchema: JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    SubscriptionsPlansModule,

    ProductsModule,
    CoffeeModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
