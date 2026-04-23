import { useQuery } from "@tanstack/react-query";
import { getQuotation } from "../api/FetchQuotation";
import { extractArray, normalizeQueryParams } from "../utils/queryData";

const QUOTATIONS_STALE_TIME = 5 * 60 * 1000;

export const getQuotationsQueryKey = (params = {}) => {
  const normalizedParams = normalizeQueryParams(params);

  return Object.keys(normalizedParams).length > 0
    ? ["quotations", normalizedParams]
    : ["quotations"];
};

export const useQuotations = (params = {}, options = {}) => {
  const normalizedParams = normalizeQueryParams(params);

  return useQuery({
    queryKey: getQuotationsQueryKey(normalizedParams),
    queryFn: async () => {
      const response = await getQuotation(normalizedParams);
      return extractArray(response);
    },
    staleTime: QUOTATIONS_STALE_TIME,
    ...options,
  });
};

export default useQuotations;
