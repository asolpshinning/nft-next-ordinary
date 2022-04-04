import { OwnerListAndTransferCell } from "./OwnerListAndTransferCell";
import { ButtonGroup, Stack } from "@chakra-ui/react";

export const ActionsCell = ({ row }) => {
  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <OwnerListAndTransferCell row={row} />
    </Stack>
  );
};
