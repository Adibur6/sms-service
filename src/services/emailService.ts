import { emailQueue } from '../queues/emailQueue';

export const sendEmail = async (subject: string, body: string, recipients: string[]): Promise<void> => {
    await emailQueue.add('sendEmail', { subject, body, recipients });
};