import { useQuery } from "@tanstack/react-query";
import { getAllStaff } from "../api/EventStaffApis";
import { extractArray, normalizeQueryParams } from "../utils/queryData";

const STAFF_STALE_TIME = 5 * 60 * 1000;

export const getStaffQueryKey = (params = {}) => {
  const normalizedParams = normalizeQueryParams(params);

  return Object.keys(normalizedParams).length > 0
    ? ["staff", normalizedParams]
    : ["staff"];
};

export const useStaff = (params = {}, options = {}) => {
  const normalizedParams = normalizeQueryParams(params);

  return useQuery({
    queryKey: getStaffQueryKey(normalizedParams),
    queryFn: async () => {
      const response = await getAllStaff(normalizedParams);
      return extractArray(response);
    },
    staleTime: STAFF_STALE_TIME,
    ...options,
  });
};

export default useStaff;
