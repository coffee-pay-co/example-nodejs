// eslint-disable-next-line prettier/prettier
import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.required(),
  PORT: Joi.number().default(3000),
  PASARELA_API: Joi.required(),
  ACCOUNT_KEY: Joi.required(),
  INTEGRITY_KEY: Joi.required(),
  API_KEY: Joi.required(),
  API_SECRET: Joi.required(),
});
