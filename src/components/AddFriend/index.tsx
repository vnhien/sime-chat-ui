import { addFriend } from "@/services/user";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddFriend() {
  const [username, setUserName] = useState("");
  const handleAddFriend = async () => {
    try {
      await addFriend(username);
      toast.success("Add friend successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div>
      <p>Add friend</p>
      <div className="relative">
        <input
          className="w-full border-1 rounded-xl h-12 border-amber-200 px-2"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          className="absolute right-2 top-2 h-8 border-1 border-amber-200 px-2 rounded-[8px] cursor-pointer"
          onClick={handleAddFriend}
        >
          Add
        </button>
      </div>
    </div>
  );
}
