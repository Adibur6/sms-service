import { addSMSToQueue } from "../queues/smsQueue";
import { config } from "../queues/config";
import { getRandomServiceNames } from "../utilities/getRandomServices";
import { smsServices } from "../third party services/serviceList";
export const sendSMS = async (text: string, phone: string): Promise<void> => {
  const serviceNames = getRandomServiceNames(smsServices);
  await addSMSToQueue(serviceNames, config.delay, text, phone);
};
