import { utils } from "ethers";

export function shortenString(str, extraShort) {
  return `${str.substring(0, extraShort ? 4 : 6)}...${str.substring(
    str.length - (extraShort ? 3 : 4),
  )}`;
}

export function shortenAddress(address, extraShort) {
  try {
    const formattedAddress = utils.getAddress(address);
    return shortenString(formattedAddress, extraShort);
  } catch {
    throw new TypeError("Invalid input, address can't be parsed");
  }
}

export function shortenIfAddress(address, extraShort) {
  if (typeof address === "string" && address.length > 0) {
    return shortenAddress(address, extraShort);
  }
  return "";
}
