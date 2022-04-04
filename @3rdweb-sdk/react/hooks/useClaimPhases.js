import { bundleDropKeys, dropKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useBundleDropResetClaimEligibilityMutation } from "./useBundleDrop";
import { useDropResetClaimEligibilityMutation } from "./useDrop";
import { NFTDrop } from "@thirdweb-dev/sdk";
import invariant from "tiny-invariant";

export function useClaimPhases(
  contract,
  tokenId,
) {
  if (contract instanceof NFTDrop) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useDropClaimPhases(contract);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useBundleDropClaimPhases(contract, tokenId);
  }
}

function useDropClaimPhases(contract) {
  return useQueryWithNetwork(
    dropKeys.claimPhases(contract?.getAddress()),
    () => contract?.claimConditions.getAll(),
    {
      enabled: !!contract,
    },
  );
}

function useBundleDropClaimPhases(contract, tokenId) {
  return useQueryWithNetwork(
    bundleDropKeys.claimPhases(contract?.getAddress(), tokenId),
    () => contract?.claimConditions.getAll(tokenId),
    {
      enabled: !!contract && !!tokenId,
    },
  );
}

export function useClaimPhasesMutation(
  contract,
  tokenId,
) {
  if (contract instanceof NFTDrop) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useDropPhasesMutation(contract);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useBundleDropPhasesMutation(contract, tokenId);
  }
}

export function useResetEligibilityMutation(
  contract,
  tokenId,
) {
  if (contract instanceof NFTDrop) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useDropResetClaimEligibilityMutation(contract);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useBundleDropResetClaimEligibilityMutation(contract, tokenId);
  }
}

function useDropPhasesMutation(contract) {
  return useMutationWithInvalidate(
    async (phases) => {
      invariant(contract, "contract is required");

      return await contract.claimConditions.set(phases);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([dropKeys.claimPhases(contract?.getAddress())]);
      },
    },
  );
}

function useBundleDropPhasesMutation(contract, tokenId) {
  return useMutationWithInvalidate(
    async (phases) => {
      invariant(contract, "contract is required");
      invariant(tokenId, "tokenId is required");

      return await contract.claimConditions.set(tokenId, phases);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          bundleDropKeys.claimPhases(contract?.getAddress(), tokenId),
        ]);
      },
    },
  );
}
