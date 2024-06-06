import { useLatest } from "ahooks";
import { Button } from "antd";
import { t } from "i18next";
import { memo, useRef, useState } from "react";

import CKEditor, { CKEditorRef, EmojiData } from "@/components/CKEditor";
import { IMSDK } from "@/layout/MainContentWrap";
import { useConversationStore } from "@/store";

import SendActionBar from "./SendActionBar";
import { useFileMessage } from "./SendActionBar/useFileMessage";
import { useSendMessage } from "./useSendMessage";

const ChatFooter = () => {
  const [html, setHtml] = useState("");
  const latestHtml = useLatest(html);

  const ckRef = useRef<CKEditorRef>(null);
  const editorWrapRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(document.createElement("textarea"));

  const { createImageOrVideoMessage } = useFileMessage();
  const { sendMessage } = useSendMessage();

  const onChange = (value: string) => {
    setHtml(value);
  };

  const replaceEmoji2Str = (text: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const emojiEls: HTMLImageElement[] = Array.from(doc.querySelectorAll(".emojione"));
    emojiEls.map((face) => {
      // @ts-ignore
      const escapedOut = face.outerHTML.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      text = text.replace(new RegExp(escapedOut, "g"), face.alt);
    });
    return text;
  };

  const getCleanText = (html: string) => {
    let text = replaceEmoji2Str(html);
    text = text.replace(/<\/p><p>/g, "\n");
    text = text.replace(/<br\s*[/]?>/gi, "\n");
    text = text.replace(/<[^>]+>/g, "");
    text = convertChar(text);
    text = decodeHtmlEntities(text);
    return text.trim();
  };

  const decodeHtmlEntities = (text: string) => {
    textAreaRef.current.innerHTML = text;
    return textAreaRef.current.value;
  };

  const convertChar = (text: string) => text.replace(/&nbsp;/gi, " ");

  const getTextMessage = async (cleanText: string) => {
    const atEls = getAtList();
    if (
      useConversationStore.getState().currentConversation?.groupID &&
      atEls.length > 0
    ) {
      let formatAtText = latestHtml.current;
      let hasAtModuleAtEnd = false;
      atEls.map((el) => {
        if (
          formatAtText.endsWith(`${el.tag}</p>`) ||
          formatAtText.endsWith(`${el.tag}&nbsp;</p>`)
        )
          hasAtModuleAtEnd = true;
        formatAtText = formatAtText.replace(new RegExp(el.tag, "g"), `@${el.userID} `);
      });

      return (
        await IMSDK.createTextAtMessage({
          text: getCleanText(formatAtText) + (hasAtModuleAtEnd ? " " : ""),
          atUserIDList: atEls.map((at) => at.userID),
          atUsersInfo: atEls.map((at) => ({
            atUserID: at.userID,
            groupNickname: at.nickname,
          })),
        })
      ).data;
    }
    return (await IMSDK.createTextMessage(cleanText)).data;
  };

  const enterToSend = async () => {
    const cleanText = getCleanText(latestHtml.current);
    const message = await getTextMessage(cleanText);
    setHtml("");
    if (!cleanText) return;

    sendMessage({ message });
  };

  const sendEmoji = (item: EmojiData) => ckRef.current?.insertEmoji(item);

  const getFeedItems = async (keyword: string) => {
    const groupID = useConversationStore.getState().currentConversation?.groupID;
    if (!groupID) return [];

    const atList = getAtList();
    if (atList.length > 9) return [];

    try {
      const { data } = await IMSDK.searchGroupMembers({
        groupID,
        offset: 0,
        count: 100,
        keywordList: [keyword],
        isSearchMemberNickname: true,
        isSearchUserID: false,
      });
      if (data.length === 0) return [];

      const feeds = data.map((item) => ({ ...item, id: `@${item.nickname}` }));
      return feeds;
    } catch (error) {
      return [];
    }
  };

  const getAtList = () => {
    if (!editorWrapRef.current) return [];

    const atels = Array.from(editorWrapRef.current.querySelectorAll(".mention"));
    const atList = atels.map((at) => ({
      userID: at.attributes.getNamedItem("data-user-id")!.value,
      nickname: at.attributes.getNamedItem("data-mention")!.value.slice(1),
      tag: at.outerHTML,
    }));

    const uniqueAtList = atList.reduce((acc, curr) => {
      if (!acc.find((item) => item.userID === curr.userID)) {
        acc.push(curr);
      }
      return acc;
    }, [] as typeof atList);

    return uniqueAtList;
  };

  return (
    <footer className="relative h-full bg-white py-px">
      <div className="flex h-full flex-col border-t border-t-[var(--gap-text)]">
        <SendActionBar
          sendEmoji={sendEmoji}
          sendMessage={sendMessage}
          createImageOrVideoMessage={createImageOrVideoMessage}
        />
        <div
          ref={editorWrapRef}
          className="relative flex flex-1 flex-col overflow-hidden"
        >
          <CKEditor
            ref={ckRef}
            value={html}
            onEnter={enterToSend}
            getFeedItems={getFeedItems}
            onChange={onChange}
          />
          <div className="flex items-center justify-end py-2 pr-3">
            <Button className="w-fit px-6 py-1" type="primary" onClick={enterToSend}>
              {t("placeholder.send")}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(ChatFooter);
