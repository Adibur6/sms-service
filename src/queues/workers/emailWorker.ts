import { Worker } from 'bullmq';
import { sendRequest } from '../../utilities/requestSender';

const redisConfig = {
    host: 'localhost',
    port: 6379,
};

const emailWorker = new Worker('emailQueue', async job => {
    try {
        const { subject, body, recipients } = job.data;
        console.log(`Email job received with subject: ${subject}, body: ${body}, recipient: ${recipients}`);

        const emailDomains = process.env.EMAIL_DOMAINS?.split(',') || [];
        if (emailDomains.length === 0) {
            throw new Error('No email domains configured');
        }

           const randomIndex = Math.floor(Math.random() * emailDomains.length);
        const selectedUrl = emailDomains[randomIndex];

        await sendRequest(selectedUrl, { subject, body, recipients });
    } catch (error) {
        console.error(`Failed to process email job ${job.id}`);
        throw error; 
    }
}, { connection: redisConfig });

emailWorker.on('completed', job => {
    console.log(`Email job ${job.id} has completed!`);
});

emailWorker.on('failed', (job, err) => {
    console.error(`Email job ${job?.id} has failed with ${err.message}`);
});

emailWorker.on('ready', () => {
    console.log('Email worker is ready');
});