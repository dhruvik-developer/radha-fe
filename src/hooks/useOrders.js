import { useQuery } from "@tanstack/react-query";
import { getAllOrder } from "../api/FetchAllOrder";
import { extractArray, normalizeQueryParams } from "../utils/queryData";

const ORDERS_STALE_TIME = 5 * 60 * 1000;

export const getOrdersQueryKey = (params = {}) => {
  const normalizedParams = normalizeQueryParams(params);

  return Object.keys(normalizedParams).length > 0
    ? ["orders", normalizedParams]
    : ["orders"];
};

export const useOrders = (params = {}, options = {}) => {
  const normalizedParams = normalizeQueryParams(params);

  return useQuery({
    queryKey: getOrdersQueryKey(normalizedParams),
    queryFn: async () => {
      const response = await getAllOrder(normalizedParams);
      return extractArray(response);
    },
    staleTime: ORDERS_STALE_TIME,
    ...options,
  });
};

export default useOrders;
