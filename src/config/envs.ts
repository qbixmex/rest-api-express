import 'dotenv/config';
import { get } from 'env-var';

export default {
  PORT: get('PORT').default(3000).asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  NODE_ENV: get('NODE_ENV').required().asString(),
  POSTGRES_URL: get('POSTGRES_URL').required().asString(),
  POSTGRES_DB: get('POSTGRES_DB').required().asString(),
  POSTGRES_USER: get('POSTGRES_USER').required().asString(),
  POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
};
