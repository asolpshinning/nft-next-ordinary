import { contractRoleKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useWeb3 } from "@3rdweb-sdk/react";
import { AddressZero } from "@ethersproject/constants";
import invariant from "tiny-invariant";


export function isContractWithRoles(contract) {
  if (contract && "roles" in contract) {
    return true;
  }
  return false;
}

export function useContractRoleMembersList(contract) {
  return useQueryWithNetwork(
    contractRoleKeys.list(contract?.getAddress()),
    () => {
      return contract.roles.getAll() 
    },
    {
      enabled: !!contract && !!contract?.getAddress(),
    },
  );
}

export function useContractRoleMembers(role, contract) {
  return useQueryWithNetwork(
    contractRoleKeys.detail(contract?.getAddress(), role),
    () => contract.roles.get(role),
    {
      enabled: !!contract && !!contract?.getAddress() && !!role,
    },
  );
}

export function useSetAllRoleMembersMutation(contract) {
  return useMutationWithInvalidate(
    async (rolesWithAddresses) => {
      invariant(contract, "contract is required");
      await contract.roles.setAll(rolesWithAddresses);
    },
    {
      onSuccess: (_data, variables, _options, invalidate) => {
        return invalidate([contractRoleKeys.list(contract?.getAddress())]);
      },
    },
  );
}

export function useAddRoleMemberMutation(contract) {
  return useMutationWithInvalidate(
    async (variables) => {
      invariant(contract, "contract is required");
      await contract.roles.grant(variables.role, variables.address);
    },
    {
      onSuccess: (_data, variables, _options, invalidate) => {
        return invalidate([
          contractRoleKeys.list(contract?.getAddress()),
          contractRoleKeys.detail(contract?.getAddress(), variables.role),
        ]);
      },
    },
  );
}
export function useIsAccountRole(role, contract, account) {
  const contractHasRoles = isContractWithRoles(contract);
  const { data } = useContractRoleMembers(
    role,
    contractHasRoles ? contract : undefined,
  );

  if (contractHasRoles === false) {
    return false;
  }

  if (data?.includes(AddressZero)) {
    return true;
  }

  return !!(account && data?.includes(account));
}

export function useIsAdmin(contract) {
  const { address } = useWeb3();
  const contractHasRoles = isContractWithRoles(contract);
  return useIsAccountRole(
    "admin",
    contractHasRoles ? contract : undefined,
    address,
  );
}
