import { Worker } from 'bullmq';

const redisConfig = {
    host: 'localhost',
    port: 6379,
};

const smsWorker = new Worker('smsQueue', async job => {
    const { message, recipient } = job.data;
    console.log(`Received job with message: ${message} and recipient: ${recipient}`);
}, { connection: redisConfig });

smsWorker.on('completed', job => {
    console.log(`SMS job ${job.id} has completed!`);
});

smsWorker.on('failed', (job, err) => {
    console.error(`SMS job ${job?.id} has failed with ${err.message}`);
});

smsWorker.on('ready', () => {
    console.log('SMS worker is ready');
});
