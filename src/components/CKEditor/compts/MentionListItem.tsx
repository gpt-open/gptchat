import { GroupMemberItem } from "open-im-sdk-wasm/lib/types/entity";

import OIMAvatar from "@/components/OIMAvatar";

export type MentionItem = GroupMemberItem & {
  id: string;
  atAll?: boolean;
};

const MentionListItem = ({ item }: { item: MentionItem }) => {
  return (
    <div
      className={
        "flex items-center rounded-md px-2 py-2 hover:bg-[var(--primary-active)]"
      }
    >
      <OIMAvatar size={26} text={item.atAll ? "@" : item.nickname} src={item.faceURL} />
      <div className="!ml-2 max-w-[200] truncate">{String(item.nickname)}</div>
    </div>
  );
};

export default MentionListItem;
