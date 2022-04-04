import { useToast } from "@chakra-ui/react";
import { parseErrorToMessage } from "utils/errorParser";

export function useTxNotifications(successMessage, errorMessage) {
  const toast = useToast();

  const onSuccess = () => {
    toast({
      title: "Success",
      description: successMessage,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const onError = (error) => {
    toast({
      title: errorMessage,
      description: parseErrorToMessage(error),
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  return { onSuccess, onError };
}
