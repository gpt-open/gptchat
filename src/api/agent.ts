import { v4 as uuidv4 } from "uuid";

import { getAgentUrl } from "@/config";
import createAxiosInstance from "@/utils/request";

const request = createAxiosInstance(getAgentUrl());

export const getChatBots = async () => {
  return request.post<{ bot_list: API.Agent.ChatBot[] }>(
    "/open_chatbot/get_bot_list",
    {},
    {
      headers: {
        operationID: uuidv4(),
      },
    },
  );
};
