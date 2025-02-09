import { Worker } from 'bullmq';
import { config } from '../config';
import { emailServices } from '../../third party services/serviceList';
import { addEmailToQueue } from '../emailQueue';
import { sortServices } from '../../utilities/sortServices';

const processEmailJob = async (jobData: any) => {
    const { serviceNames, subject, body, recipients } = jobData;

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

        if (serviceNames.length > 0) {
            serviceNames.shift();
            await addEmailToQueue(serviceNames, delay, subject, body, recipients);
        } else {
            const newServiceNames = sortServices(emailServices);
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