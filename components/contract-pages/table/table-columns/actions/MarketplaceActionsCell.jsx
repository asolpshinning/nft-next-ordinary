import { useMarketplaceCancelMutation, useWeb3 } from "@3rdweb-sdk/react";
import { ButtonGroup } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Stack } from "@chakra-ui/layout";
import { useMarketplace } from "@thirdweb-dev/react";
import { Button } from "components/buttons/Button";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useTxNotifications } from "hooks/useTxNotifications";
import React from "react";
import { FiXCircle } from "react-icons/fi";


export const MarketplaceActionsCell = ({
  row,
}) => {
  const { address } = useWeb3();
  const txNotifications = useTxNotifications(
    "Succesfully cancelled listing",
    "Error cancelling listing",
  );

  const isOwner =
    address?.toLowerCase() === row.original.sellerAddress.toLowerCase();

  const marketplaceContract = useMarketplace(
    useSingleQueryParam("marketplace"),
  );
  const unlist = useMarketplaceCancelMutation(
    marketplaceContract?.getAddress(),
  );

  const unlistMutation = () => {
    unlist.mutate(
      {
        listingId: row.original.id,
        listingType: row.original.type,
      },
      txNotifications,
    );
  };

  if (!isOwner) {
    return null;
  }

  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <Button
        isLoading={unlist.isLoading}
        isDisabled={!marketplaceContract}
        onClick={unlistMutation}
        leftIcon={<Icon as={FiXCircle} />}
      >
        Cancel Listing
      </Button>
    </Stack>
  );
};
