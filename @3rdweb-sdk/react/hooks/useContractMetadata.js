import { contractKeys, networkKeys } from "../cache-keys";
import { useActiveChainId } from "./useActiveChainId";
import { useWeb3 } from "./useWeb3";
import { useQuery } from "react-query";

export function useContractMetadataWithAddress(
  address,
  queryFn,
  chainId
) {
  const activeChainId = useActiveChainId();
  const web3 = useWeb3();
  const cId = chainId || activeChainId || web3.chainId;

  return useQuery(
    [...networkKeys.chain(cId), ...contractKeys.detail(address)],
    () => queryFn(),
    { enabled: !!address && typeof queryFn === "function" && !!cId },
  );
}
