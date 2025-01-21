import { addSMSToQueue } from '../queues/smsQueue';

export const sendSMS = async (text: string, phone: string): Promise<void> => {
    await addSMSToQueue(text, phone);
};