import { Queue } from 'bullmq';

const redisConfig = {
    host: 'localhost',
    port: 6379,
    };
export const smsQueue = new Queue('smsQueue', { connection: redisConfig });