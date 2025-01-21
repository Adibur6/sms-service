import { Worker } from 'bullmq';
import { sendRequest } from '../../utilities/requestSender';
import { config } from '../config';
import { emailServices } from '../../third party services/serviceList';
import { addEmailToQueue } from '../emailQueue';
import { AxiosError } from 'axios';
import { getRandomServiceNames } from '../../utilities/getRandomServices';
const emailWorker = new Worker('emailQueue', async job => {
    const { serviceNames, delay , subject, body, recipients } = job.data;
    console.log(`Email job received with subject: ${subject}, body: ${body}, recipients: ${recipients}`);
    console.log(`Service Names: ${serviceNames}`);
    console.log(`Delay: ${delay}`);
    
    try {
        if (serviceNames.length === 0) {
            throw new Error('No email services remains');
        }

        const nextUrl = emailServices.filter(service => serviceNames[0]===service.name)[0].url;

        
        await sendRequest(nextUrl, { subject, body, recipients });
    } catch (error) {
        console.error(`Failed to process Email job ${job.id}`);
        if (error instanceof AxiosError) {

            serviceNames.shift();
            addEmailToQueue(serviceNames, delay, subject, body, recipients);
        }
        else{
            const serviceNames= getRandomServiceNames(emailServices);
            addEmailToQueue( serviceNames, 2* delay, subject, body, recipients);

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