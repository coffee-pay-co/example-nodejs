import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSubscriptionsPlanDto {
  @IsOptional()
  @IsUUID()
  accountId?: string;

  @IsString()
  name: string;

  @IsString()
  reference: string;

  @IsNumber()
  price: number;

  @IsUUID()
  currencyId: string;

  @IsString()
  interval: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';

  @IsNumber()
  intervalCount: number;

  @IsNumber()
  billingDay: number;

  @IsNumber()
  freeDays: number;

  @IsBoolean()
  allowProrate: boolean;

  @IsString()
  redirectUrl: string;

  @IsString()
  description: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  urlBack: string;
}
