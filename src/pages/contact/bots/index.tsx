import { Empty, Space, Tag } from "antd";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import OIMAvatar from "@/components/OIMAvatar";
import { useUserStore } from "@/store";
import emitter from "@/utils/events";

export const BotList = () => {
  const { t } = useTranslation();
  const chatBots = useUserStore((state) => state.agentData.chatBots);

  const showUserCard = useCallback((userID: string) => {
    emitter.emit("OPEN_USER_CARD", {
      userID,
    });
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white">
      <div className="m-5.5 text-base font-extrabold">{t("placeholder.myFriend")}</div>
      {!chatBots.length ? (
        <Empty className="mt-[30%]" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div className="ml-4 mt-4 flex-1 overflow-auto pr-4">
          {chatBots.map((bot) => (
            <div
              key={bot.userID}
              className="flex items-center rounded-md px-3.5 pb-3 pt-2.5 transition-colors hover:bg-[var(--primary-active)]"
              onClick={() => showUserCard(bot.userID)}
            >
              <OIMAvatar src={bot.faceURL} text={bot.nickname} />
              <Space size={4} direction="vertical" className="ml-3">
                <div className="truncate text-sm">{bot.nickname}</div>
                <Tag
                  bordered={false}
                  color="processing"
                >{`${bot.llmname} ${bot.model}`}</Tag>
              </Space>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
