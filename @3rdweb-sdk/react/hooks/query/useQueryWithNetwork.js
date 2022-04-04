import { networkKeys, useActiveChainId } from "@3rdweb-sdk/react";
import { useCallback } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

export function useQueryWithNetwork(
  queryKey,
  queryFn,
  options
) {
  const activeChainId = useActiveChainId();

  const mergedOptions = {
    ...options,
    enabled: !!(activeChainId && options?.enabled),
  };

  const combinedQueryKey = (
    networkKeys.chain(activeChainId)
  ).concat(queryKey);
  return useQuery(combinedQueryKey, queryFn, mergedOptions);
}
export function useMutationWithInvalidate 
(
  mutationFn,
  options
) {
  const activeChainId = useActiveChainId();
  const queryClient = useQueryClient();

  const invalidate = useCallback(
    (cacheKeysToInvalidate) => {
      return Promise.all(
        cacheKeysToInvalidate.map((cacheKey) => {
          return queryClient.invalidateQueries(
            (networkKeys.chain(activeChainId)).concat(
              cacheKey,
            )
          );
        }),
      );
    },
    [queryClient, activeChainId],
  );

  return useMutation(mutationFn, {
    ...options,
    onSuccess: (...args) => {
      if (options?.onSuccess) {
        options.onSuccess(...args, invalidate);
      }
    },
  });
}
