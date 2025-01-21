import { Request, Response } from 'express';
import { sendSMS } from '../services/smsService';
import { sendEmail } from '../services/emailService';

export const pingController = (req: Request, res: Response) => {
    res.send('pong');
};

export const sendSMSController = async (req: Request, res: Response) => {
    try {
        const { text, phone } = req.body;
        await sendSMS(text, phone);
        res.status(202).send({message: 'Accepted for delivery'});
    } catch (error) {
        res.status(500).send({ error: 'Failed to send SMS' });
    }
};

export const sendEmailController = async (req: Request, res: Response) => {
    try {
        const { subject, body, recipients } = req.body;
        await sendEmail(subject, body, recipients);
        res.status(202).send({message: 'Accepted for delivery'});
    } catch (error) {
        res.status(500).send({ error: 'Failed to send email' });
    }
};