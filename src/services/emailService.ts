import { addEmailToQueue } from '../queues/emailQueue';

export const sendEmail = async (subject: string, body: string, recipients: string[]): Promise<void> => {
    await addEmailToQueue(subject, body, recipients);
};