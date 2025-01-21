import { smsQueue } from '../queues/smsQueue';

export const sendSMS = async (message: string, recipient: string): Promise<void> => {
    await smsQueue.add('sendSMS', { message, recipient });
};