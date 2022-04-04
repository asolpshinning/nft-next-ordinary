import { Box, BoxProps } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/system";

const defaultBoxProps = {
  shadow: "sm",
  backgroundColor: "backgroundHighlight",
  px: 4,
  py: 4,
  borderRadius: "xl",
  borderWidth: "1px",
  borderColor: "gray.200",
};

export const Card = ({
  children,
  ...requiredBoxProps
}) => {
  const light = {
    ...defaultBoxProps,
    borderWidth: "1px",
    borderColor: "gray.200",
  };
  const dark = {
    ...defaultBoxProps,
    borderWidth: "1px",
    borderColor: "whiteAlpha.100",
  };
  const defaultProps = useColorModeValue(light, dark);
  return <Box {...{ ...defaultProps, ...requiredBoxProps }}>{children}</Box>;
};
