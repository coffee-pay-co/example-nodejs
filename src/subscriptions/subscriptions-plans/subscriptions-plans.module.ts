import { Module } from '@nestjs/common';
import { SubscriptionsPlansService } from './subscriptions-plans.service';
import { SubscriptionsPlansController } from './subscriptions-plans.controller';

@Module({
  controllers: [SubscriptionsPlansController],
  providers: [SubscriptionsPlansService],
})
export class SubscriptionsPlansModule {}
