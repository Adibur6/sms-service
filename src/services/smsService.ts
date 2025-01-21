import { smsQueue } from '../queues/smsQueue';

export const sendSMS = async (text: string, phone: string): Promise<void> => {
    await smsQueue.add('sendSMS', { text, phone });
};