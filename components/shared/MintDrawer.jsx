import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { ValidContractInstance } from "@thirdweb-dev/sdk";
import { MintForm } from "components/contract-pages/forms/mint";

export const MintDrawer = ({
  isOpen,
  onClose,
  contract,
}) => {
  return (
    <Drawer
      allowPinchZoom
      preserveScrollBarGap
      size="lg"
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <MintForm contract={contract} />
      </DrawerContent>
    </Drawer>
  );
};
