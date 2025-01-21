import { sendRequest } from '../utilities/requestSender';
import { Service } from '../types/service';
export const smsServices: Service[] = [
    {
        name: 'provider1',
        url: 'http://localhost:8071/api/sms/provider1',
        send: async function (payload: any) {
            await sendRequest(this.url, payload);
        }
    },
    {
        name: 'provider2',
        url: 'http://localhost:8072/api/sms/provider2',
        send: async function (payload: any) {
            await sendRequest(this.url, payload);
        }
    },
    {
        name: 'provider3',
        url: 'http://localhost:8073/api/sms/provider3',
        send: async function (payload: any) {
            await sendRequest(this.url, payload);
        }
    }
];

export const emailServices: Service[] = [
    {
        name: 'provider1',
        url: 'http://localhost:8091/api/email/provider1',
        send: async function (payload: any) {
            await sendRequest(this.url, payload);
        }
    },
    {
        name: 'provider2',
        url: 'http://localhost:8092/api/email/provider2',
        send: async function (payload: any) {
            await sendRequest(this.url, payload);
        }
    },
    {
        name: 'provider3',
        url: 'http://localhost:8093/api/email/provider3',
        send: async function (payload: any) {
            await sendRequest(this.url, payload);
        }
    }
];
