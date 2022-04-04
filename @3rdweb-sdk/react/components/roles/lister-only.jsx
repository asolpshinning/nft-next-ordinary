import {
  isContractWithRoles,
  useIsAccountRole,
  useWeb3,
} from "@3rdweb-sdk/react";

export const ListerOnly = ({
  children,
  contract,
}) => {
  const { address } = useWeb3();

  const isLister = useIsAccountRole(
    "lister",
    isContractWithRoles(contract) ? contract : undefined,
    address,
  );

  if (!isLister) {
    return null;
  }

  return <>{children}</>;
};
