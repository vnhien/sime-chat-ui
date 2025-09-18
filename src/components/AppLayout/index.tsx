"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PropsWithChildren } from "react";
import { Network } from "@aptos-labs/ts-sdk";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Applayout({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <AptosWalletAdapterProvider
          autoConnect
          optInWallets={["Petra"]}
          dappConfig={{
            network: Network.MAINNET,
            aptosApiKeys: {
              mainnet: process.env.APTOS_API_KEY_MAINNET,
            },
          }}
          onError={(error) => {
            console.log("error", error);
          }}
        >
          {children}
        </AptosWalletAdapterProvider>
      </>
    </QueryClientProvider>
  );
}
