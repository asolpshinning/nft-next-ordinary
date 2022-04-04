import flatten from "flat";

const generateSize = (base, fontSizeKey) => ({
  fontSize: `${base}.${fontSizeKey}`,
  fontWeight: base,
  lineHeight: base,
  letterSpacing: base,
});

export const FormLabel = {
  sizes: flatten(
    {
      label: {
        sm: generateSize("label", "sm"),
        md: generateSize("label", "md"),
        lg: generateSize("label", "lg"),
      },
    },
    { maxDepth: 2 },
  ),
  variants: {
    light: {
      color: "paragraphLight",
    },
  },
  defaultProps: {
    size: "label.md",
  },
};
