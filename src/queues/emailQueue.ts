import { Queue } from 'bullmq';
import { config } from './config';

export const emailQueue = new Queue('emailQueue', { connection: config.redis });

export const addEmailToQueue = async (subject: string, body: string, recipients: string[]): Promise<void> => {
  await emailQueue.add('sendEmail', { subject, body, recipients }, {
    attempts: Number.MAX_SAFE_INTEGER,
    backoff: {
      type: 'exponential',
      delay: 1000, 
    },
  });
}