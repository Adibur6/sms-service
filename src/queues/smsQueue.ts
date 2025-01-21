import { Queue } from 'bullmq';
import { config } from './config';
import { getRandomServiceNames} from '../utilities/getRandomServices'
import {smsServices} from '../third party services/serviceList'

export const smsQueue = new Queue('smsQueue', { connection: config.redis });

export const addSMSToQueue = async (text: string, phone: string): Promise<void> => {
    const serviceNames = getRandomServiceNames(smsServices);
    await smsQueue.add('sendSMS', { delay: config.delay, serviceNames, text, phone }, {
        delay: config.delay
    });
};