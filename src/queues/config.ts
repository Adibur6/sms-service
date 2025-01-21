export const config = {
    redis: {
        host: 'localhost',
        port: 6379
    },
    concurrency: 5, 
    retry: {
        retries: 3, 
        delay: 5000, 
    }
};