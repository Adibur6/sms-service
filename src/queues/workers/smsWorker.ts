import { Worker } from 'bullmq';
import { sendRequest } from '../../utilities/requestSender';

const redisConfig = {
    host: 'localhost',
    port: 6379,
};

const smsWorker = new Worker('smsQueue', async job => {
    try {
        const { text, phone } = job.data;
        console.log(`SMS job received with text: ${text}, phone: ${phone}`);
        // Parse SMS_DOMAINS from environment variable
        const smsDomains = process.env.SMS_DOMAINS?.split(',') || [];
        if (smsDomains.length === 0) {
            throw new Error('No SMS domains configured');
        }

        // Select a random URL from the smsDomains array
        const randomIndex = Math.floor(Math.random() * smsDomains.length);
        const selectedUrl = smsDomains[randomIndex];

        // Send request to the selected URL with job data as payload
        await sendRequest(selectedUrl, { text, phone });
    } catch (error) {
        console.error(`Failed to process SMS job ${job.id}`);
        throw error; // Re-throw the error to ensure it is caught by the 'failed' event handler
    }
}, { connection: redisConfig });

smsWorker.on('completed', job => {
    console.log(`SMS job ${job.id} has completed!`);
});

smsWorker.on('failed', (job, err) => {
    console.error(`SMS job ${job?.id} has failed.`);
});

smsWorker.on('ready', () => {
    console.log('SMS worker is ready');
});