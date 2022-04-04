import { useTableContext } from "../../table-context";
import { useWeb3 } from "@3rdweb-sdk/react";
import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { MdDriveFileMoveOutline } from "react-icons/md";

export const OwnerListAndTransferCell = ({ row }) => {
  const { address } = useWeb3();
  const tableContext = useTableContext();
  const isOwner =
    "owner" in row.original ? row.original.owner === address : false;
  if (!isOwner) {
    return null;
  }
  return (
    <>
      <Button
        onClick={() =>
          tableContext.expandRow({
            tokenI,
            type: "transfer",
          })
        }
        leftIcon={<Icon as={MdDriveFileMoveOutline} />}
      >
        Transfer
      </Button>
    </>
  );
};
