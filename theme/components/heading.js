import flatten from "flat";

const generateSize = (base, fontSizeKey) => ({
  fontSize: `${base}.${fontSizeKey}`,
  fontWeight: base,
  lineHeight: base,
  letterSpacing: base,
});

export const Heading = {
  baseStyle: {
    color: "heading",
  },
  sizes: flatten(
    {
      display: {
        sm: generateSize("display", "sm"),
        md: generateSize("display", "md"),
        lg: generateSize("display", "lg"),
      },
      title: {
        sm: generateSize("title", "sm"),
        md: generateSize("title", "md"),
        lg: generateSize("title", "lg"),
      },
      subtitle: {
        sm: generateSize("subtitle", "sm"),
        md: generateSize("subtitle", "md"),
        lg: generateSize("subtitle", "lg"),
      },
      label: {
        sm: generateSize("label", "sm"),
        md: generateSize("label", "md"),
        lg: generateSize("label", "lg"),
      },
    },
    { maxDepth: 2 },
  ),

  defaultProps: {
    size: "title.lg",
  },
};
