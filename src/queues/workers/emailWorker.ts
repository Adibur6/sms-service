import { Worker } from 'bullmq';

const redisConfig = {
    host: 'localhost',
    port: 6379,
};

const emailWorker = new Worker('emailQueue', async job => {
    const { subject, body, recipient } = job.data;
    console.log(`Email job received with subject: ${subject}, body: ${body}, recipient: ${recipient}`);
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