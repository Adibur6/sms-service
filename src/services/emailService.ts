import { addEmailToQueue } from '../queues/emailQueue';
import { config } from '../queues/config';
import { emailServices } from '../third party services/serviceList';
import { sortServices } from '../utilities/sortServices';

export const sendEmail = async (subject: string, body: string, recipients: string[]): Promise<void> => {
    const serviceNmaes = sortServices(emailServices);
    await addEmailToQueue(serviceNmaes, config.delay, subject, body, recipients);
};