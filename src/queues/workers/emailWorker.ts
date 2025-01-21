import { Worker } from 'bullmq';
import { sendRequest } from '../../utilities/requestSender';
import { config } from '../config';
import { emailServices } from '../../third party services/serviceList';
import { addEmailToQueue } from '../emailQueue';
import { AxiosError } from 'axios';
import { getRandomServiceNames } from '../../utilities/getRandomServices';

const processEmailJob = async (jobData: any) => {
    const { serviceNames, delay, subject, body, recipients } = jobData;

    if (serviceNames.length === 0) {
        throw new Error('No email services remain');
    }

    const nextServiceName = serviceNames[0];
    const nextService = emailServices.find(service => service.name === nextServiceName);

    if (!nextService) {
        throw new Error(`Service ${nextServiceName} not found`);
    }

    await nextService.send({ subject, body, recipients });
};

const emailWorker = new Worker('emailQueue', async job => {
    try {
        console.log(`Email job received with subject: ${job.data.subject}, body: ${job.data.body}, recipients: ${job.data.recipients}`);
        await processEmailJob(job.data);
    } catch (error) {
        console.error(`Failed to process email job ${job.id}`);
        const { serviceNames, delay, subject, body, recipients } = job.data;

        if (error instanceof AxiosError) {
            serviceNames.shift();
            await addEmailToQueue(serviceNames, delay, subject, body, recipients);
        } else {
            const newServiceNames = getRandomServiceNames(emailServices);
            await addEmailToQueue(newServiceNames, 2 * delay, subject, body, recipients);
        }

        throw error;
    }
}, { connection: config.redis });

emailWorker.on('completed', job => {
    console.log(`Email job ${job.id} has completed!`);
});

emailWorker.on('failed', (job, err) => {
    console.error(`Email job ${job?.id} has failed with ${err.message}`);
});

emailWorker.on('ready', () => {
    console.log('Email worker is ready');
});