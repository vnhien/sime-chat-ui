import { getAuthAPI, postAuthAPI } from "./fetch-functions";
import { APP_URL } from "./url";

export type RTFriendList = {
  friends: {
    friendId: string;
    friendName: string;
  }[];
};
export async function friendList() {
  return getAuthAPI<RTFriendList>(`${APP_URL}/api/user/friend-list`);
}

export async function addFriend(name: string) {
  return postAuthAPI(`${APP_URL}/api/user/add-friend`, { body: JSON.stringify({ name }) });
}
