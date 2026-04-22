import { createItem, deleteItem, updateItem } from "../api/FetchItem";
import useApiMutation from "./useApiMutation";

const BRANCH_ITEMS_QUERY_KEYS = [["branch-items"]];

export const useCreateBranchItemMutation = () =>
  useApiMutation({
    mutationKey: ["mutations", "create-branch-item"],
    mutationFn: createItem,
    invalidateQueryKeys: BRANCH_ITEMS_QUERY_KEYS,
  });

export const useUpdateBranchItemMutation = () =>
  useApiMutation({
    mutationKey: ["mutations", "update-branch-item"],
    mutationFn: ({ id, data }) => updateItem(id, data),
    invalidateQueryKeys: BRANCH_ITEMS_QUERY_KEYS,
  });

export const useDeleteBranchItemMutation = () =>
  useApiMutation({
    mutationKey: ["mutations", "delete-branch-item"],
    mutationFn: deleteItem,
    invalidateQueryKeys: BRANCH_ITEMS_QUERY_KEYS,
  });
