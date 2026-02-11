import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionsPlansService } from './subscriptions-plans.service';
import { CreateSubscriptionsPlanDto } from './dto/create-subscriptions-plan.dto';
import { UpdateSubscriptionsPlanDto } from './dto/update-subscriptions-plan.dto';

@Controller('subscriptions-plans')
export class SubscriptionsPlansController {
  constructor(
    private readonly subscriptionsPlansService: SubscriptionsPlansService,
  ) {}

  @Post()
  create(@Body() createSubscriptionsPlanDto: CreateSubscriptionsPlanDto) {
    return this.subscriptionsPlansService.create(createSubscriptionsPlanDto);
  }

  @Get()
  findAll() {
    return this.subscriptionsPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionsPlansService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionsPlanDto: UpdateSubscriptionsPlanDto,
  ) {
    return this.subscriptionsPlansService.update(
      id,
      updateSubscriptionsPlanDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionsPlansService.remove(id);
  }
}
