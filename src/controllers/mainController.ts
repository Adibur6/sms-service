import { Request, Response } from 'express';
import { sendSMS } from '../services/smsService';
import { sendEmail } from '../services/emailService';

export const pingController = (req: Request, res: Response) => {
    res.send('pong');
};

export const sendSMSController = async (req: Request, res: Response) => {
    try {
        const { message, recipient } = req.body;
        await sendSMS(message, recipient);
        res.status(202).send({message: 'Accepted for delivery'});
    } catch (error) {
        res.status(500).send({ error: 'Failed to send SMS' });
    }
};

export const sendEmailController = async (req: Request, res: Response) => {
    try {
        const { subject, body, recipient } = req.body;
        await sendEmail(subject, body, recipient);
        res.status(202).send({message: 'Accepted for delivery'});
    } catch (error) {
        res.status(500).send({ error: 'Failed to send email' });
    }
};