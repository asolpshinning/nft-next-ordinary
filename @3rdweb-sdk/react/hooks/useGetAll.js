import { useQueryWithNetwork } from "./query/useQueryWithNetwork";
import { useContractTypeOfContract } from "./useCommon";
import { AddressZero } from "@ethersproject/constants";
import { BigNumber } from "ethers";

export const getAllQueryKey = (contract, queryParams) => {
  // this "hook" is a basic function that returns the cache key for the getAll function
  const contractType =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContractTypeOfContract(contract) || ("invalid-contract");
  const contractAddress = contract?.getAddress() || AddressZero;
  return queryParams
    ? ([contractType, contractAddress, "getAll", queryParams])
    : ([contractType, contractAddress, "getAll"]);
};

export const getTotalCountQueryKey = (contract) => {
  // this "hook" is a basic function that returns the cache key for the getAll function
  const contractType =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContractTypeOfContract(contract) || ("invalid-contract");
  const contractAddress = contract?.getAddress() || AddressZero;
  return [contractType, contractAddress, "totalCount"];
};

export function useGetAll(contract, queryParams) {
  const queryKey = getAllQueryKey(contract, queryParams);

  return useQueryWithNetwork(
    queryKey,
    async () => {
      if (!contract) {
        return [];
      }
      if ("getAll" in contract) {
        return await contract.getAll(queryParams);
      }
      return [];
    },
    { enabled: !!contract && "getAll" in contract, keepPreviousData: true },
  );
}

export function useGetTotalCount(contract) {
  const queryKey = getTotalCountQueryKey(contract);

  return useQueryWithNetwork(
    queryKey,
    async () => {
      if (!contract) {
        return BigNumber.from(0);
      }
      if ("getTotalCount" in contract) {
        return await contract.getTotalCount();
      }
      return BigNumber.from(0);
    },
    {
      enabled: !!contract && "getTotalCount" in contract,
      keepPreviousData: true,
    },
  );
}
