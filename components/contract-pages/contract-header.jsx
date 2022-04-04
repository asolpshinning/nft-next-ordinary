import { useContractTypeOfContract } from "@3rdweb-sdk/react";
import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import { FeatureIconMap } from "constants/mappings";
import React from "react";

export const ContractHeader = ({
  contractMetadata,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  contract,
}) => {
  const contractType = useContractTypeOfContract(contract);
  const address = contract?.getAddress();
  const renderName = contractMetadata?.name || address || "";
  const contractImage = contractMetadata?.image;
  const image = contractType && FeatureIconMap[contractType];
  return (
    <Flex flexDirection={"row"} justify="space-between" align="center">
      <Flex gap={2} direction="row" align="center">
        <Box display={{ base: "none", md: "block" }}>
          {contractImage ? (
            <Image
              src={contractImage}
              objectFit="contain"
              boxSize="64px"
              alt={renderName}
            />
          ) : image ? (
            <ChakraNextImage boxSize="64px" src={image} alt={renderName} />
          ) : null}
        </Box>
        <Flex direction="column" alignItems="flex-start">
          <Heading>{renderName}</Heading>
          {address && (
            <Flex
              justifyContent="center"
              alignItems="center"
              my={2}
              flexDir={{ base: "column", md: "row" }}
              mr={{ base: 2, md: 0 }}
            >
              <AddressCopyButton variant="solid" address={address} />
            </Flex>
          )}
        </Flex>
      </Flex>
      <Stack direction={{ base: "column", md: "row" }} as={ButtonGroup}>
        {tertiaryAction}
        {secondaryAction}
        {primaryAction}
      </Stack>
    </Flex>
  );
};
