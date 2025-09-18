import { AuthResponse, LoginRequest, RegisterRequest, UserInfo } from "@/types/auth";
import { APP_URL } from "./url";
import { getAuthAPI, postAPI } from "./fetch-functions";

export async function registerUser(data: RegisterRequest) {
  return postAPI<AuthResponse>(`${APP_URL}/api/auth/register`, {
    body: JSON.stringify(data),
  });
}

export async function loginUser(data: LoginRequest) {
  return postAPI<AuthResponse>(`${APP_URL}/api/auth/login`, {
    body: JSON.stringify(data),
  });
}

export async function getUserInfo() {
  return await getAuthAPI<UserInfo>(`${APP_URL}/api/user/info`);
}
