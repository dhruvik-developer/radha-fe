import { useQuery } from "@tanstack/react-query";
import { getPaymentHistory } from "../api/FetchPaymentHistory";
import { normalizeQueryParams } from "../utils/queryData";

const PAYMENT_HISTORY_STALE_TIME = 5 * 60 * 1000;

export const getPaymentHistoryQueryKey = (params = {}) => {
  const normalizedParams = normalizeQueryParams(params);

  return Object.keys(normalizedParams).length > 0
    ? ["payment-history", normalizedParams]
    : ["payment-history"];
};

export const usePaymentHistory = (params = {}, options = {}) => {
  const normalizedParams = normalizeQueryParams(params);

  return useQuery({
    queryKey: getPaymentHistoryQueryKey(normalizedParams),
    queryFn: async () => {
      const response = await getPaymentHistory(normalizedParams);
      if (response?.data?.status) return response.data.data ?? null;
      return null;
    },
    staleTime: PAYMENT_HISTORY_STALE_TIME,
    ...options,
  });
};

export default usePaymentHistory;
