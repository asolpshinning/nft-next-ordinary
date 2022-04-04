import { Link, LinkProps } from "@chakra-ui/react";

function generateEmailBodyFromContext(context) {
  if (!context) {
    return "";
  }
  return encodeURIComponent(`

  ------------------- please do not edit below this line -------------------${
    context.projectAddress ? `\nproject address: ${context.projectAddress}` : ""
  }${
    context.walletAddress ? `\nwallet address: ${context.walletAddress}` : ""
  }${
    context.contractAddress
      ? `\ncontract address: ${context.contractAddress}`
      : ""
  }
  `);
}

export const EmailLink = (props) => {
  const { email, subjectLine, body, context, ...rest } = props;

  const _body = body
    ? body
    : context
    ? generateEmailBodyFromContext(context)
    : "";

  const href = `mailto:${email}?subject=${subjectLine}${
    _body ? `&body=${_body}` : ""
  }`;

  return <Link {...rest} href={href} isExternal />;
};
