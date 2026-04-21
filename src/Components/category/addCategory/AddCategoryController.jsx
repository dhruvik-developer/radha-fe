import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../../hooks/useCategoryMutations";
import AddCategoryComponent from "./AddCategoryComponent";

function AddCategoryController() {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();
  const createCategoryMutation = useCreateCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const response = await createCategoryMutation.mutateAsync(categoryName);
    if (response) {
      navigate("/category");
    }
  };

  return (
    <AddCategoryComponent
      categoryName={categoryName}
      setCategoryName={setCategoryName}
      navigate={navigate}
      handleSubmit={handleSubmit}
    />
  );
}

export default AddCategoryController;
