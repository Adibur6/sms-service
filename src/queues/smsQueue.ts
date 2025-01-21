import { Queue } from 'bullmq';
import { config } from './config';

export const smsQueue = new Queue('smsQueue', { connection: config.redis });

export const addSMSToQueue = async (text: string, phone: string): Promise<void> => {
    await smsQueue.add('sendSMS', { text, phone }, {
        attempts: Number.MAX_SAFE_INTEGER,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
    });
};