import 'dotenv/config';
import { get } from 'env-var';

export default {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
};
