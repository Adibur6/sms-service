import { Service } from '../types/service';


export const getRandomServiceNames = (services: Service[]): string[] => {
    const shuffled = services
        .map(service => ({ service, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ service }) => service.name);
    return shuffled;
};

