import { generateBundleDropTableColumns } from "./bundledrop";
import { generateCollectionableColumns } from "./collection";
import { generateDropTableColumns } from "./drop";
import { generateMarketplaceTableColumns } from "./marketplace";
import { generateNFTableColumns } from "./nft";
import {
  Edition,
  EditionDrop,
  Marketplace,
  NFTCollection,
  NFTDrop,
} from "@thirdweb-dev/sdk";
import { useMemo } from "react";

export function useTableColumns(contract) {
  return useMemo(() => {
    if (!contract) {
      return [];
    }
    if (contract instanceof NFTCollection) {
      return generateNFTableColumns();
    }
    if (contract instanceof Edition) {
      return generateCollectionableColumns();
    }
    if (contract instanceof NFTDrop) {
      return generateDropTableColumns();
    }
    if (contract instanceof EditionDrop) {
      return generateBundleDropTableColumns();
    }
    // if (contract instanceof MarketContract) {
    //   return generateMarketTableColumns();
    // }
    if (contract instanceof Marketplace) {
      return generateMarketplaceTableColumns();
    }
    throw new Error(`contract table not implemented for contract: ${contract}`);
  }, [contract]);
}
