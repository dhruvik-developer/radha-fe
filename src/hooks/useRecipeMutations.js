import { useQueryClient } from "@tanstack/react-query";
import { createRecipe, deleteRecipe, updateRecipe } from "../api/recipes";
import useApiMutation from "./useApiMutation";

export const useCreateRecipeMutation = () => {
  return useApiMutation({
    mutationKey: ["mutations", "create-recipe"],
    mutationFn: createRecipe,
    invalidateQueryKeys: [["recipes"]],
  });
};

export const useUpdateRecipeMutation = () =>
  useApiMutation({
    mutationKey: ["mutations", "update-recipe"],
    mutationFn: ({ id, recipeData }) => updateRecipe(id, recipeData),
    invalidateQueryKeys: [["recipes"]],
  });

export const useDeleteRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationKey: ["mutations", "delete-recipe"],
    mutationFn: deleteRecipe,
    invalidateQueryKeys: [["recipes"]],
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["recipes"] });
      const previous = queryClient.getQueriesData({ queryKey: ["recipes"] });

      queryClient.setQueriesData({ queryKey: ["recipes"] }, (old = []) => {
        if (!Array.isArray(old)) return old;
        return old.filter((recipe) => String(recipe?.id) !== String(id));
      });

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (!context?.previous) return;
      context.previous.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
  });
};
