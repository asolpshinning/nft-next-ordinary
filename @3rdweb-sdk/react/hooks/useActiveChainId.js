import { useSingleQueryParam } from "hooks/useQueryParam";
import {
  getChainIdFromNetwork,
  getNetworkFromChainId,
} from "utils/network";

export function useActiveChainId() {
  const networkFromUrl = useSingleQueryParam("network");
  return getChainIdFromNetwork(networkFromUrl);
}

export function useActiveNetwork() {
  const activeChainId = useActiveChainId();
  return activeChainId && getNetworkFromChainId(activeChainId);
}
