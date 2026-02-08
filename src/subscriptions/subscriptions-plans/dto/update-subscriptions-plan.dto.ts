import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionsPlanDto } from './create-subscriptions-plan.dto';

export class UpdateSubscriptionsPlanDto extends PartialType(CreateSubscriptionsPlanDto) {}
