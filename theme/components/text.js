import flatten from "flat";

const generateSize = (base, fontSizeKey) => ({
  fontSize: `${base}.${fontSizeKey}`,
  fontWeight: base,
  lineHeight: base,
  letterSpacing: base,
});

export const Text = {
  baseStyle: {
    color: "paragraph",
  },
  sizes: flatten(
    {
      label: {
        sm: generateSize("label", "sm"),
        md: generateSize("label", "md"),
        lg: generateSize("label", "lg"),
      },
      body: {
        sm: generateSize("body", "sm"),
        md: generateSize("body", "md"),
        lg: generateSize("body", "lg"),
      },
    },
    { maxDepth: 2 },
  ),
  defaultProps: {
    size: "body.md",
  },
};
