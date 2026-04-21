import { useMutation, useQueryClient } from "@tanstack/react-query";

const invalidateKeys = async (queryClient, queryKeys = []) => {
  await Promise.all(
    queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey }))
  );
};

export const useApiMutation = ({
  mutationFn,
  invalidateQueryKeys = [],
  mutationKey,
  onSuccess,
  onError,
  onMutate,
  onSettled,
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey,
    mutationFn,
    onMutate,
    onError,
    onSuccess: async (data, variables, context) => {
      await invalidateKeys(queryClient, invalidateQueryKeys);
      if (onSuccess) {
        await onSuccess(data, variables, context);
      }
    },
    onSettled,
  });
};

export default useApiMutation;
