import { bundleDropKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useContractMetadata } from "./useContract";
import { getAllQueryKey } from "./useGetAll";
import { useWeb3 } from "@3rdweb-sdk/react";
import { useEditionDrop } from "@thirdweb-dev/react";
import invariant from "tiny-invariant";

export function useBundleDropContractMetadata(contractAddress) {
  return useContractMetadata(useEditionDrop(contractAddress));
}

export function useBundleDropResetClaimEligibilityMutation(
  contract,
  tokenId,
) {
  return useMutationWithInvalidate(async () => {
    invariant(contract, "contract is required");
    invariant(tokenId, "token id is required");
    const claimConditions = await contract.claimConditions.getAll(tokenId);
    const cleaned = claimConditions.map((c) => ({
      ...c,
      price: c.currencyMetadata.displayValue,
    }));

    return await contract.claimConditions.set(tokenId, cleaned, true);
  });
}

export function useBundleDropActiveClaimCondition(
  contractAddress,
  tokenId,
) {
  const dropContract = useEditionDrop(contractAddress);
  return useQueryWithNetwork(
    bundleDropKeys.activeClaimCondition(contractAddress, tokenId),
    async () => {
      return await dropContract?.claimConditions.getActive(tokenId);
    },
    {
      enabled: !!dropContract && !!contractAddress && tokenId !== undefined,
    },
  );
}

export function useBundleDropBalance(
  contractAddress,
  tokenId,
) {
  const dropContract = useEditionDrop(contractAddress);
  const { address } = useWeb3();
  return useQueryWithNetwork(
    bundleDropKeys.balanceOf(contractAddress, address, tokenId),
    async () => {
      return await dropContract?.balanceOf(address || "", tokenId || "");
    },
    {
      enabled:
        !!dropContract &&
        !!contractAddress &&
        !!address &&
        tokenId !== undefined,
    },
  );
}

// ----------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------

export function useBundleDropMintMutation(contract) {
  return useMutationWithInvalidate(
    async (data) => {
      invariant(contract, "contract is required");
      return await contract.createBatch([data]);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([getAllQueryKey(contract)]);
      },
    },
  );
}

export function useBundleDropBatchMint(contract) {
  return useMutationWithInvalidate(
    async (data) => {
      invariant(contract, "contract is required");
      return await contract.createBatch(data);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([getAllQueryKey(contract)]);
      },
    },
  );
}

export function useBundleDropClaimMutation(
  contract,
  tokenId,
) {
  return useMutationWithInvalidate(
    async () => {
      invariant(contract, "contract is required");
      invariant(tokenId, "tokenId is required");
      return await contract.claim(tokenId, 1);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          getAllQueryKey(contract),
          bundleDropKeys.detail(contract?.getAddress()),
        ]);
      },
    },
  );
}

export function useBundleDropClaimConditionMutation(
  contract,
  tokenId,
) {
  return useMutationWithInvalidate(
    async (data) => {
      invariant(contract, "contract is required");
      invariant(tokenId, "tokenId is required");
      return await contract.claimConditions.set(tokenId, data);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([bundleDropKeys.detail(contract?.getAddress())]);
      },
    },
  );
}
