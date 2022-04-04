import { useMutationWithInvalidate } from "./query/useQueryWithNetwork";
import { getAllQueryKey, getTotalCountQueryKey } from "./useGetAll";
import { useMarketplace } from "@thirdweb-dev/react";
import { ListingType } from "@thirdweb-dev/sdk";

export function useMarketplaceDirectListMutation(contractAddress) {
  const marketplace = useMarketplace(contractAddress);
  return useMutationWithInvalidate(
    async (data) => {
      return await marketplace?.direct.createListing({
        ...data,
      });
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          getAllQueryKey(marketplace),
          getTotalCountQueryKey(marketplace),
        ]);
      },
    },
  );
}

export function useMarketplaceAuctionListMutation(contractAddress) {
  const marketplace = useMarketplace(contractAddress);
  return useMutationWithInvalidate(
    async (data) => {
      return await marketplace?.auction.createListing({
        ...data,
      });
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          getAllQueryKey(marketplace),
          getTotalCountQueryKey(marketplace),
        ]);
      },
    },
  );
}

export function useMarketplaceCancelMutation(contractAddress) {
  const marketplace = useMarketplace(contractAddress);
  return useMutationWithInvalidate(
    async (data) => {
      const { listingId, listingType } = data;

      if (listingType === ListingType.Auction) {
        return await marketplace?.auction.cancelListing(listingId);
      } else {
        return await marketplace?.direct.cancelListing(listingId);
      }
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          getAllQueryKey(marketplace),
          getTotalCountQueryKey(marketplace),
        ]);
      },
    },
  );
}
