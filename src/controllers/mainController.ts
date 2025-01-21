import { Request, Response } from 'express';
import { sendSMS } from '../services/smsService';
import { sendEmail } from '../services/emailService';

export const pingController = (req: Request, res: Response) => {
    res.send('pong');
};

export const sendSMSController = (req: Request, res: Response) => {
    try {
        const { message, recipient } = req.body;
        const result = sendSMS(message, recipient);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to send SMS' });
    }
};

export const sendEmailController = (req: Request, res: Response) => {
    try {
        const { subject, body, recipient } = req.body;
        const result = sendEmail(subject, body, recipient);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to send email' });
    }
};