"use client";

import { useUser } from "@/context/user-info-context";

export default function UserInfo() {
  const { isLoggedIn, userInfo, logout } = useUser();

  if (!isLoggedIn) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Not logged in</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-100 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800">User Information</h3>
      <div className="mt-2 space-y-1">
        <p className="text-green-700">
          <span className="font-medium">Username:</span> {userInfo?.username}
        </p>
        <p className="text-green-700">
          <span className="font-medium">User ID:</span> {userInfo?.userId}
        </p>
        <p className="text-green-700">
          <span className="font-medium">Created At:</span>{" "}
          {userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : "N/A"}
        </p>
      </div>
      <button
        onClick={logout}
        className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
