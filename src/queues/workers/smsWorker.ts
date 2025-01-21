import { Worker } from 'bullmq';
import { config } from '../config';
import { smsServices } from '../../third party services/serviceList';
import { addSMSToQueue } from '../smsQueue';
import { AxiosError } from 'axios';
import { getRandomServiceNames } from '../../utilities/getRandomServices';

const processSMSJob = async (jobData: any) => {
    const { serviceNames, delay, text, phone } = jobData;

    if (serviceNames.length === 0) {
        throw new Error('No SMS services remain');
    }

    const nextServiceName = serviceNames[0];
    const nextService = smsServices.find(service => service.name === nextServiceName);

    if (!nextService) {
        throw new Error(`Service ${nextServiceName} not found`);
    }

    await nextService.send({ text, phone });
};

const smsWorker = new Worker('smsQueue', async job => {
    try {
        console.log(`SMS job received with text: ${job.data.text}, phone: ${job.data.phone}`);
        await processSMSJob(job.data);
    } catch (error) {
        console.error(`Failed to process SMS job ${job.id}`);
        const { serviceNames, delay, text, phone } = job.data;

        if (error instanceof AxiosError) {
            serviceNames.shift();
            await addSMSToQueue(serviceNames, delay, text, phone);
        } else {
            const newServiceNames = getRandomServiceNames(smsServices);
            await addSMSToQueue(newServiceNames, 2 * delay, text, phone);
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