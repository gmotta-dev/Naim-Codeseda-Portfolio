import { getPayload, type Payload } from "payload";
import config from "@/payload.config";

let payloadInstance: Payload | null = null;

const getPayloadInstance = async () => {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config });
  }
  return payloadInstance;
};

// Create a proxy object that forwards all calls to the payload instance
const payload = new Proxy({} as Payload, {
  get(target, prop) {
    return async (...args: any[]) => {
      const instance = await getPayloadInstance();
      return (instance as any)[prop](...args);
    };
  }
});

export default payload;
