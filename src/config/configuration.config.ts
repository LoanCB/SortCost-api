import { config } from 'dotenv';

config({ path: `${process.cwd()}/.env` });

export default () => ({
  node_env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3100'),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '3306'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
});
