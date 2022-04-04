import { useMutationWithInvalidate } from "./query/useQueryWithNetwork";
import { useContractMetadata } from "./useContract";
import { getAllQueryKey, getTotalCountQueryKey } from "./useGetAll";
import { useNFTCollection } from "@thirdweb-dev/react";
import invariant from "tiny-invariant";

export function useNFTContractMetadata(contractAddress) {
  return useContractMetadata(useNFTCollection(contractAddress));
}
// ----------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------

export function useNftMintMutation(contract) {
  return useMutationWithInvalidate(
    async (data) => {
      invariant(contract, "contract is required");

      return await contract.mint(data);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          getAllQueryKey(contract),
          getTotalCountQueryKey(contract),
        ]);
      },
    },
  );
}
