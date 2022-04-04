import {
  useDelegateMutation,
  useTokensDelegated,
} from "@3rdweb-sdk/react/hooks/useVote";
import { Icon, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { ValidContractInstance } from "@thirdweb-dev/sdk";
import { MismatchButton } from "components/buttons/MismatchButton";
import { MintDrawer } from "components/shared/MintDrawer";
import { FiPlus } from "react-icons/fi";
import { parseErrorToMessage } from "utils/errorParser";

export const ProposalButton = ({ contract }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MintDrawer isOpen={isOpen} onClose={onClose} contract={contract} />
      <MismatchButton
        colorScheme="primary"
        onClick={onOpen}
        leftIcon={<Icon as={FiPlus} />}
      >
        Create Proposal
      </MismatchButton>
    </>
  );
};

export const DelegateButton = ({ contract }) => {
  const toast = useToast();
  const { data: delegated, isLoading } = useTokensDelegated(
    contract?.getAddress(),
  );
  const { mutate: delegate, isLoading: isDelegating } = useDelegateMutation(
    contract?.getAddress(),
  );

  if (delegated || isLoading) {
    return null;
  }

  const delegateTokens = () => {
    delegate(undefined, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Tokens succesfully delegated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error delegating tokens",
          description: parseErrorToMessage(error),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Tooltip label="You need to delegate tokens to this contract before you can make proposals and vote.">
      <MismatchButton
        colorScheme="primary"
        onClick={delegateTokens}
        isLoading={isDelegating}
      >
        Delegate Tokens
      </MismatchButton>
    </Tooltip>
  );
};
