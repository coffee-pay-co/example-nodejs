import { Injectable } from '@nestjs/common';
import { CreateSubscriptionsPlanDto } from './dto/create-subscriptions-plan.dto';
import { UpdateSubscriptionsPlanDto } from './dto/update-subscriptions-plan.dto';

import { CoffeeSDK } from 'coffee-pay-sdk';

@Injectable()
export class SubscriptionsPlansService {
  constructor(private readonly coffeeSDK: CoffeeSDK) {}

  async create(createSubscriptionsPlanDto: CreateSubscriptionsPlanDto) {
    return await this.coffeeSDK.subscriptionsPlans.create(
      createSubscriptionsPlanDto,
    );
  }

  async findAll() {
    return await this.coffeeSDK.subscriptionsPlans.list();
  }

  async findOne(id: string) {
    return await this.coffeeSDK.subscriptionsPlans.get(id);
  }

  async update(
    id: string,
    updateSubscriptionsPlanDto: UpdateSubscriptionsPlanDto,
  ) {
    return await this.coffeeSDK.subscriptionsPlans.update(
      id,
      updateSubscriptionsPlanDto,
    );
  }

  async remove(id: string) {
    return await this.coffeeSDK.subscriptionsPlans.delete(id);
  }
}
