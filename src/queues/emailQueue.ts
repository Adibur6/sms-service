import { Queue } from 'bullmq';
import { config } from './config';

export const emailQueue = new Queue('emailQueue', { connection: config.redis });