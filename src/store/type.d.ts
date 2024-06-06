import {
  AtTextElem,
  BlackUserItem,
  ConversationItem,
  FriendApplicationItem,
  FriendUserItem,
  GroupApplicationItem,
  GroupItem,
  GroupMemberItem,
  MessageItem,
  SelfUserInfo,
} from "open-im-sdk-wasm/lib/types/entity";

import { BusinessUserInfo } from "@/api/login";

import { ExMessageItem } from "./message";

export type IMConnectState = "success" | "loading" | "failed";

export interface UserStore {
  syncing: IMConnectState;
  selfInfo: BusinessUserInfo;
  appConfig: AppConfig;
  appSettings: AppSettings;
  agentData: AgentData;
  updateSyncState: (syncing: IMConnectState) => void;
  updateSelfInfo: (info: Partial<BusinessUserInfo>) => void;
  getSelfInfoByReq: () => void;
  getAppConfigByReq: () => Promise<void>;
  updateAppSettings: (settings: Partial<AppSettings>) => void;
  getAgentData: () => Promise<void>;
  userLogout: (force?: boolean) => Promise<void>;
}

export interface AppConfig {
  discoverPageURL: string;
  ordinaryUserAddFriend: number;
  allowSendMsgNotFriend: number;
  needInvitationCodeRegister: number;
}

export interface AppSettings {
  locale: LocaleString;
  closeAction: "miniSize" | "quit";
}

export interface AgentData {
  chatBots: API.Agent.ChatBot[];
}

export type LocaleString = "zh-CN" | "en-US";

export type ConversationListUpdateType = "push" | "filter";

export interface ConversationStore {
  conversationList: ConversationItem[];
  currentChatBot?: API.Agent.ChatBot;
  currentConversation?: ConversationItem;
  unReadCount: number;
  currentGroupInfo?: GroupItem;
  currentMemberInGroup?: GroupMemberItem;
  getConversationListByReq: (isOffset?: boolean) => Promise<boolean>;
  updateConversationList: (
    list: ConversationItem[],
    type: ConversationListUpdateType,
  ) => void;
  delConversationByCID: (conversationID: string) => void;
  updateCurrentConversation: (conversation?: ConversationItem) => void;
  getUnReadCountByReq: () => Promise<number>;
  updateUnReadCount: (count: number) => void;
  getCurrentGroupInfoByReq: (groupID: string) => Promise<void>;
  updateCurrentGroupInfo: (groupInfo: GroupItem) => void;
  getCurrentMemberInGroupByReq: (groupID: string) => Promise<void>;
  tryUpdateCurrentMemberInGroup: (member: GroupMemberItem) => void;
  clearConversationStore: () => void;
}

export interface GetMessageReverseParams {
  message: ExMessageItem;
  conversationID: string;
}

export interface ContactStore {
  friendList: FriendUserItem[];
  blackList: BlackUserItem[];
  groupList: GroupItem[];
  recvFriendApplicationList: FriendApplicationItem[];
  sendFriendApplicationList: FriendApplicationItem[];
  recvGroupApplicationList: GroupApplicationItem[];
  sendGroupApplicationList: GroupApplicationItem[];
  unHandleFriendApplicationCount: number;
  unHandleGroupApplicationCount: number;
  getFriendListByReq: () => Promise<void>;
  setFriendList: (list: FriendUserItem[]) => void;
  updateFriend: (friend: FriendUserItem, remove?: boolean) => void;
  pushNewFriend: (friend: FriendUserItem) => void;
  getBlackListByReq: () => Promise<void>;
  updateBlack: (black: BlackUserItem, remove?: boolean) => void;
  pushNewBlack: (black: BlackUserItem) => void;
  getGroupListByReq: () => Promise<void>;
  setGroupList: (list: GroupItem[]) => void;
  updateGroup: (group: GroupItem, remove?: boolean) => void;
  pushNewGroup: (group: GroupItem) => void;
  getRecvFriendApplicationListByReq: () => Promise<void>;
  updateRecvFriendApplication: (application: FriendApplicationItem) => void;
  getSendFriendApplicationListByReq: () => Promise<void>;
  updateSendFriendApplication: (application: FriendApplicationItem) => void;
  getRecvGroupApplicationListByReq: () => Promise<void>;
  updateRecvGroupApplication: (application: GroupApplicationItem) => void;
  getSendGroupApplicationListByReq: () => Promise<void>;
  updateSendGroupApplication: (application: GroupApplicationItem) => void;
  updateUnHandleFriendApplicationCount: (num: number) => void;
  updateUnHandleGroupApplicationCount: (num: number) => void;
  clearContactStore: () => void;
}
