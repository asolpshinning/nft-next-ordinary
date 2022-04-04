import { useRouter } from "next/router";
import { getSingleQueryValue } from "utils/router";

export function useSingleQueryParam(key) {
  const { query } = useRouter();
  return getSingleQueryValue(query, key);
}
