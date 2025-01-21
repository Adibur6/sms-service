import { Queue } from "bullmq";
import { config } from "./config";

export const smsQueue = new Queue("smsQueue", { connection: config.redis });

export const addSMSToQueue = async (
  serviceNames: string[],
  delay: number,
  text: string,
  phone: string
): Promise<void> => {
  await smsQueue.add(
    "sendSMS",
    { delay, serviceNames, text, phone },
    {
      delay,
    }
  );
};
