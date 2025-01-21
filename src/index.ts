import express from 'express';
import mainRoutes from './routes/mainRoutes';
import dotenv from 'dotenv';
import './queues/workers/emailWorker'; // Import email worker
import './queues/workers/smsWorker'; // Import SMS worker

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', mainRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});