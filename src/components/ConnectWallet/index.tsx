import { groupAndSortWallets, useWallet } from "@aptos-labs/wallet-adapter-react";

export default function ConnectWallet() {
  const { wallets = [], notDetectedWallets = [], connect, account } = useWallet();
  console.log("🚀 ~ ConnectWallet ~ account:", account);
  console.log("🚀 ~ ConnectWallet ~ wallets:", wallets);

  return (
    <div>
      <div>
        <p className="truncate">{account?.address?.toString()}</p>
      </div>
      {wallets.map((w, index) => {
        return (
          <div key={index}>
            {w.name}
            <button
              onClick={() => {
                connect(w.name);
              }}
              className="h-10  rounded-xl px-2 border-1 cursor-pointer"
            >
              connect
            </button>
          </div>
        );
      })}
    </div>
  );
}
