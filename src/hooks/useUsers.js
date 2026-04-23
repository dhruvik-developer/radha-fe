import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/FetchUsers";
import { extractArray, normalizeQueryParams } from "../utils/queryData";

const USERS_STALE_TIME = 5 * 60 * 1000;

export const getUsersQueryKey = (params = {}) => {
  const normalizedParams = normalizeQueryParams(params);

  return Object.keys(normalizedParams).length > 0
    ? ["users", normalizedParams]
    : ["users"];
};

export const useUsers = (params = {}, options = {}) => {
  const normalizedParams = normalizeQueryParams(params);

  return useQuery({
    queryKey: getUsersQueryKey(normalizedParams),
    queryFn: async () => {
      const response = await getUsers(normalizedParams);
      return extractArray(response);
    },
    staleTime: USERS_STALE_TIME,
    ...options,
  });
};

export default useUsers;
