import {
  createIngredientCategory,
  createIngredientItem,
  createVendor,
  updateVendor,
} from "../api/vendors";
import useApiMutation from "./useApiMutation";

export const useCreateVendorMutation = () =>
  useApiMutation({
    mutationKey: ["mutations", "create-vendor"],
    mutationFn: createVendor,
    invalidateQueryKeys: [["vendors"]],
  });

export const useUpdateVendorMutation = () =>
  useApiMutation({
    mutationKey: ["mutations", "update-vendor"],
    mutationFn: ({ id, data }) => updateVendor(id, data),
    invalidateQueryKeys: [["vendors"]],
  });

export const useCreateIngredientCategoryMutation = () =>
  useApiMutation({
    mutationKey: ["mutations", "create-ingredient-category"],
    mutationFn: ({ name, isCommon = false }) =>
      createIngredientCategory(name, isCommon),
    invalidateQueryKeys: [["ingredient-categories"]],
  });

export const useCreateIngredientItemMutation = () =>
  useApiMutation({
    mutationKey: ["mutations", "create-ingredient-item"],
    mutationFn: ({ itemName, category }) =>
      createIngredientItem(itemName, category),
    invalidateQueryKeys: [["ingredient-categories"], ["ingredient-items"]],
  });
