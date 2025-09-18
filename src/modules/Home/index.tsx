"use client";

import ChatWindow from "@/components/ChatWindow";
import FriendList from "@/components/FriendList";
import LoginRequired from "@/components/LoginRequired";

export default function Home() {
  return (
    <LoginRequired>
      <div className="max-w-full w-full">
        <div className="flex align-top gap-4">
          <FriendList />
          <ChatWindow />
        </div>
      </div>
    </LoginRequired>
  );
}
