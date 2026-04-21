import { executeConfirmationRequest } from "../api/requestActions";
import useApiMutation from "./useApiMutation";

export const useConfirmationMutation = (options = {}) => {
  const { invalidateQueryKeys = [] } = options;

  return useApiMutation({
    mutationKey: ["mutations", "confirmation-request"],
    mutationFn: executeConfirmationRequest,
    invalidateQueryKeys,
  });
};

export default useConfirmationMutation;
