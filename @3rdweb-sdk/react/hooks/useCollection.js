import { useMutationWithInvalidate } from "./query/useQueryWithNetwork";
import { getAllQueryKey } from "./useGetAll";
import {
  Edition,
} from "@thirdweb-dev/sdk";
import invariant from "tiny-invariant";

// ----------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------

export function useCollectionCreateAndMintMutation(contract) {
  return useMutationWithInvalidate(
    async (metadataWithSupply) => {
      invariant(contract, "contract is required");

      const { supply, ...metadata } = metadataWithSupply;

      return await contract.mint({ metadata, supply });
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([getAllQueryKey(contract)]);
      },
    },
  );
}
