import { Queue } from 'bullmq';
import { config } from './config';

export const smsQueue = new Queue('smsQueue', { connection: config.redis });