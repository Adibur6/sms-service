import { Queue } from 'bullmq';

const redisConfig = {
  host: 'localhost',
  port: 6379,
};

export const emailQueue = new Queue('emailQueue', { connection: redisConfig });