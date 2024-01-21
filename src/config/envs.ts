import 'dotenv/config';
import { get } from 'env-var';

export default {
  PORT: get('PORT').default(3000).asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
};
