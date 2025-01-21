import axios, { AxiosResponse } from 'axios';

export const sendRequest = async (url: string, payload: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await axios.post(url, payload);
        return response;
    } catch (error) {
        console.error(`Failed to send request to ${url}`);
        throw error;
    }
};