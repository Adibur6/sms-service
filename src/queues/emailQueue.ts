import { Queue } from 'bullmq';
import { config } from './config';

export const emailQueue = new Queue('emailQueue', { connection: config.redis });

export const addEmailToQueue = async (serviceNames:string[],delay:number, subject: string, body: string, recipients: string[]): Promise<void> => {
  await emailQueue.add('sendEmail', { delay, serviceNames , subject, body, recipients }, {
        delay
    });
};