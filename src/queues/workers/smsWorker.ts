import { Worker } from 'bullmq';
import { config } from '../config';
import { smsServices } from '../../third party services/serviceList';
import { addSMSToQueue } from '../smsQueue';
import { AxiosError } from 'axios';
import { getRandomServiceNames } from '../../utilities/getRandomServices';

const smsWorker = new Worker('smsQueue', async job => {
    const { serviceNames, delay, text, phone } = job.data;
    console.log(`SMS job received with text: ${text}, phone: ${phone}`);
    console.log(`Service Names: ${serviceNames}`);
    console.log(`Delay: ${delay}`);

    try {
        if (serviceNames.length === 0) {
            throw new Error('No SMS services remain');
        }
        const firstServiceName = serviceNames[0];

        const nextService = smsServices.find(service => service.name === firstServiceName);
        if (!nextService) {
            throw new Error(`Service ${firstServiceName} not found`);
        }

        await nextService.send({ text, phone });
    } catch (error) {
        console.error(`Failed to process SMS job ${job.id}`);
        if (error instanceof AxiosError) { // Retry with new service if the job failed due to network error
            serviceNames.shift(); 
            addSMSToQueue(serviceNames, delay, text, phone);
        } else { // Retry with exponential delay if the job failed due to lack of service 
            const newServiceNames = getRandomServiceNames(smsServices);
            addSMSToQueue(newServiceNames, 2 * delay, text, phone);
        }

        throw error;
    }
}, { connection: config.redis });

smsWorker.on('completed', job => {
    console.log(`SMS job ${job.id} has completed!`);
});

smsWorker.on('failed', (job, err) => {
    console.error(`SMS job ${job?.id} has failed with ${err.message}`);
});

smsWorker.on('ready', () => {
    console.log('SMS worker is ready');
});