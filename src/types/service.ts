export type Service = {
    name: string;
    url: string;
    send: (payload: any) => Promise<void>;
}
