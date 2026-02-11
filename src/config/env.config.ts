export const EnvConfigurations = () => ({
  enviroment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3500,
  pasarelaApi:
    process.env.PASARELA_API || 'https://production.coffee-pay.co/api/v1',
  accountKey: process.env.ACCOUNT_KEY || 'ACCOUNT_KEY',
  integrityKey: process.env.INTEGRITY_KEY || 'INTEGRITY_KEY',
  apiKey: process.env.API_KEY || 'API_KEY',
  apiSecret: process.env.API_SECRET || 'API_SECRET',
  widgetBaseUrl:
    process.env.WIDGET_BASE_URL || 'https://production.coffee-pay.co',
  widgetCheckoutUrl:
    process.env.WIDGET_CHECKOUT_URL || 'https://production.coffee-pay.co',
  widgetScriptUrl:
    process.env.WIDGET_SCRIPT_URL ||
    'https://production.coffee-pay.co/widget.js',
});
