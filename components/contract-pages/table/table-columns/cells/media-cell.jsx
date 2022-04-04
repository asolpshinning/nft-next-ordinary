import { chakra } from "@chakra-ui/react";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFTMetadata } from "@thirdweb-dev/sdk";

const ChakraThirdwebNftMedia = chakra(ThirdwebNftMedia);

export const MediaCell = ({ cell }) => {
  const nftMetadata = cell.value;
  return (
    <ChakraThirdwebNftMedia
      metadata={nftMetadata}
      requireInteraction
      flexShrink={0}
      boxSize={24}
      objectFit="contain"
    />
  );
};
