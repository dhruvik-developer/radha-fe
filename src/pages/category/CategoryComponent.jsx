/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FiFolder } from "react-icons/fi";
import CategoryTable from "../../Components/category/CategoryTable";
import Loader from "../../Components/common/Loader";
import {
  AddCategoryModal,
  AddItemModal,
  AddIngredientModal,
} from "../../Components/category/CategoryModals";

function CategoryComponent({
  categories,
  items,
  onAddCategory,
  onEditCategory,
  onSubCategoryDelete,
  onItemDelete,
  onSwappingCategory,
  loading,
  navigate,
  onRefresh,
}) {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const subcategoryCount =
    categories?.reduce((sum, c) => sum + (c.items?.length || 0), 0) || 0;

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: "background.paper" }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: (t) => t.palette.primary.light + "33",
              color: "primary.main",
              width: 44,
              height: 44,
            }}
          >
            <FiFolder size={20} />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Categories
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {categories?.length || 0} categories • {subcategoryCount}{" "}
              subcategories
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAddCategory(true)}
          >
            + Add Category
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowAddIngredient(true)}
          >
            + Add Ingredient
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowAddItem(true)}
          >
            + Add Item
          </Button>
        </Stack>
      </Stack>

      {loading ? (
        <Loader message="Loading categories & subcategories..." />
      ) : (
        <CategoryTable
          categories={categories || []}
          items={items || []}
          activeCategoryId={activeCategoryId}
          setActiveCategoryId={setActiveCategoryId}
          onEditCategory={onEditCategory}
          onSubCategoryDelete={onSubCategoryDelete}
          onItemDelete={onItemDelete}
          onSwappingCategory={onSwappingCategory}
          onRefresh={onRefresh}
        />
      )}

      <AddCategoryModal
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onSuccess={onRefresh}
      />
      <AddItemModal
        isOpen={showAddItem}
        onClose={() => setShowAddItem(false)}
        onSuccess={onRefresh}
        initialCategory={
          activeCategoryId || (categories?.length > 0 ? categories[0].id : null)
        }
      />
      <AddIngredientModal
        isOpen={showAddIngredient}
        onClose={() => setShowAddIngredient(false)}
        onSuccess={onRefresh}
      />
    </Paper>
  );
}

export default CategoryComponent;
