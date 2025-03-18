import Ably from "ably";

const generateUUID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
};

const ably = new Ably.Realtime({
  key: process.env.NEXT_PUBLIC_ABLY_API_KEY!,
  clientId: generateUUID(),
});

export default ably;
