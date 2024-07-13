import * as dotenv from 'dotenv';
dotenv.config();

export const DATABASE_TYPE = process.env.DATABASE_TYPE;
export const DATABASE_NAME = process.env.DATABASE_NAME;
