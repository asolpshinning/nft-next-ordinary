import {
  useIsAccountRole,
  useWeb3,
  isContractWithRoles,
} from "@3rdweb-sdk/react";

export const AdminOnly = ({
  children,
  contract,
  fallback,
}) => {
  const { address } = useWeb3();

  const isAdmin = useIsAccountRole(
    "admin",
    isContractWithRoles(contract) ? contract : undefined,
    address,
  );
  if (!isAdmin) {
    return fallback ?? null;
  }
  return <>{children}</>;
};

export const AdminOrSelfOnly = ({
  children,
  self,
  fallback,
  contract,
}) => {
  const { address } = useWeb3();

  const isAdmin = useIsAccountRole(
    "admin",
    isContractWithRoles(contract) ? contract : undefined,
    address,
  );
  if (!isAdmin && address !== self) {
    return fallback ?? null;
  }
  return <>{children}</>;
};
