import { useUser } from "@/context/user-info-context";
import { friendList } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import AddFriend from "../AddFriend";

export default function FriendList() {
  const { data } = useQuery({
    queryKey: ["friend-list"],
    queryFn: async () => {
      return await friendList();
    },
  });
  const { setActiveFriend, activeFriend } = useUser();
  return (
    <div className="min-w-[300px] p-2 border-1 border-amber-200 rounded-2xl">
      <div className="my-1">
        <AddFriend />
      </div>
      <p className="font-bold mb-[20px]">Friend List</p>
      {data?.friends?.map((friend, index) => {
        return (
          <div
            key={index}
            className={`mb-3 border-1 border-amber-200 rounded-2xl px-3 py-2 cursor-pointer ${
              activeFriend === friend.friendId ? "bg-amber-950" : ""
            }`}
            onClick={() => setActiveFriend(friend.friendId)}
          >
            <p>{friend.friendName}</p>
          </div>
        );
      })}
    </div>
  );
}
