import { Service } from '../types/service';


export const sortServices = (services: Service[]): string[] => {
    const sortedNames = services
        .map(service => ({ service, sort: service.priority }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ service }) => service.name);
    return sortedNames;
};

