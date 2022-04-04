import { hasWindow } from "./helper";

export function isBrowser() {
  return hasWindow;
}
