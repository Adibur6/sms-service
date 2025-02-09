import { addSMSToQueue } from "../queues/smsQueue";
import { config } from "../queues/config";
import { sortServices } from "../utilities/sortServices";
import { smsServices } from "../third party services/serviceList";
export const sendSMS = async (text: string, phone: string): Promise<void> => {
  const serviceNames = sortServices(smsServices);
  await addSMSToQueue(serviceNames, config.delay, text, phone);
};
