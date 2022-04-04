import { Badge, Tooltip } from "@chakra-ui/react";
import React from "react";

export const OpenSeaPropertyBadge = (props) => {
  return (
    <Tooltip label="This property is supported on OpenSea">
      <Badge
        {...props}
        borderRadius="full"
        variant="outline"
        colorScheme="opensea"
      >
        OpenSea
      </Badge>
    </Tooltip>
  );
};
