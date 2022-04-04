import { Icon } from "@chakra-ui/react";
import { TransactionButton } from "components/buttons/TransactionButton";
import { FaCoins } from "react-icons/fa";

export const DistributeButton = ({
  isLoading,
  transactions,
  distributeFunds,
  ...restButtonProps
}) => {
  return (
    <TransactionButton
      transactionCount={transactions}
      borderRadius="full"
      isLoading={isLoading}
      leftIcon={<Icon as={FaCoins} />}
      colorScheme="primary"
      onClick={distributeFunds}
      {...restButtonProps}
    >
      Distribute Funds
    </TransactionButton>
  );
};
