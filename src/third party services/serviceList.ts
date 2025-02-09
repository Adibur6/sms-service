import { sendRequest } from '../utilities/requestSender';
import { Service } from '../types/service';

const createService = (name: string, url: string,priority: number): Service => ({
    name,
    url,
    send: async function (payload: any) {
        await sendRequest(this.url, payload);
    },
    priority,
});

export const smsServices: Service[] = [
    createService('provider1', 'http://localhost:8071/api/sms/provider1', 1),
    createService('provider2', 'http://localhost:8072/api/sms/provider2', 2),
    createService('provider3', 'http://localhost:8073/api/sms/provider3', 3)
];

export const emailServices: Service[] = [
    createService('provider1', 'http://localhost:8091/api/email/provider1', 1),
    createService('provider2', 'http://localhost:8092/api/email/provider2', 2),
    createService('provider3', 'http://localhost:8093/api/email/provider3', 3)
];