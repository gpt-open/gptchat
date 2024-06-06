import MarkdownPreview from "@uiw/react-markdown-preview";
import clsx from "clsx";
import { MessageType } from "open-im-sdk-wasm";
import { FC } from "react";

import { parseTwemoji } from "@/components/Twemoji";
import { formatAtText } from "@/utils/imCommon";

import { IMessageItemProps } from ".";
import styles from "./message-item.module.scss";

const TextMessageRender: FC<IMessageItemProps> = ({ message }) => {
  let content = message.textElem?.content;

  if (message.contentType === MessageType.AtTextMessage) {
    content = formatAtText(message.atTextElem);
  }

  content = content.replace(/：\*\*/g, "：** ");

  return (
    <MarkdownPreview
      className={clsx(styles.bubble, "!text-sm !text-inherit")}
      wrapperElement={{
        "data-color-mode": "light",
      }}
      source={parseTwemoji(content)}
      components={{
        a: ({ children, ...props }) => (
          <a {...props} target="_blank">
            {children}
          </a>
        ),
        span: (props) => {
          const { className, node, ...rest } = props;
          return (
            <span
              {...props}
              onClick={() => {
                if (className?.includes("link-el") && node?.properties.dataId) {
                  window.userClick(node.properties.dataId as string);
                }
              }}
            />
          );
        },
      }}
    />
  );
};

export default TextMessageRender;
