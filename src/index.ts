import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

app.post('/sms', (req: Request, res: Response) => {
    const { message, recipient } = req.body;
    // Here you would add logic to send the SMS
    res.send(`SMS sent to ${recipient} with message: ${message}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});