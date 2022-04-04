import { useActiveChainId, useWeb3 } from ".";
import { useQueryWithNetwork } from "./query/useQueryWithNetwork";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { alchemyUrlMap } from "components/app-layouts/providers";
import { useEffect, useState } from "react";

export function useAlchemy() {
  const activeChainId = useActiveChainId();
  const [alchemy, setAlchemy] = useState();

  useEffect(() => {
    if (activeChainId && activeChainId in alchemyUrlMap) {
      setAlchemy(
        createAlchemyWeb3(alchemyUrlMap[activeChainId]),
      );
    }
  }, [activeChainId]);

  return { alchemy: alchemy?.alchemy };
}

export function useWalletNFTs() {
  const { address } = useWeb3();
  const { alchemy } = useAlchemy();

  return useQueryWithNetwork(
    ["walletNfts", address],
    async () => {
      if (!alchemy || !address) {
        return;
      }

      try {
        const data = await alchemy.getNfts({ owner: address });
        const nftData = data.ownedNfts
          .map((nft) => {
            if (!nft.contract.address) {
              return null;
            }

            if ((nft).metadata && (nft).metadata.image) {
              return {
                contractAddress: nft.contract.address,
                tokenId: parseInt(nft.id.tokenId, 16),
                metadata: (nft).metadata,
                image: (nft).metadata?.image.replace(
                  "ipfs://",
                  `${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/`,
                ),
                tokenType: nft.id.tokenMetadata?.tokenType,
              };
            } else if ((nft).metadata) {
              return {
                contractAddress: nft.contract.address,
                tokenId: parseInt(nft.id.tokenId, 16),
                metadata: (nft).metadata,
                tokenType: nft.id.tokenMetadata?.tokenType,
              };
            } else {
              return {
                contractAddress: nft.contract.address,
                tokenId: parseInt(nft.id.tokenId, 16),
                tokenType: nft.id.tokenMetadata?.tokenType,
              };
            }
          })
          .filter((nft) => !!nft);

        return nftData;
      } catch (err) {
        console.log("Network not supported");
        throw err;
      }
    },
    {
      enabled: !!alchemy && !!address,
    },
  );
}
