const protocol = window.location.protocol;
const hostname = window.location.hostname;
const isHttps = protocol === "https:";

export const WS_URL = `${protocol}//${hostname}${isHttps ? "/msg_gateway" : ":10001"}`;
export const API_URL = `${protocol}//${hostname}${isHttps ? "/api" : ":10002"}`;
export const CHAT_URL = `${protocol}//${hostname}${isHttps ? "/chat" : ":10008"}`;
export const AGENT_URL = `${protocol}//${hostname}${isHttps ? "/agent" : ":9000"}`;

export const getWsUrl = () => (import.meta.env.VITE_WS_URL as string) || WS_URL;
export const getApiUrl = () => (import.meta.env.VITE_API_URL as string) || API_URL;
export const getChatUrl = () => (import.meta.env.VITE_CHAT_URL as string) || CHAT_URL;
export const getAgentUrl = () =>
  (import.meta.env.VITE_AGENT_URL as string) || AGENT_URL;
