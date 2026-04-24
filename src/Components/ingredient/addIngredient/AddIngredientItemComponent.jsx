/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import Dropdown from "../../common/formDropDown/DropDown";

function AddIngredientItemComponent({
  itemName,
  category,
  setItemName,
  setCategory,
  categories,
  navigate,
  handleSubmit,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        bgcolor: "background.paper",
        mt: 5,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<FiArrowLeft size={16} />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Add Ingredient Item
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Item Name"
            placeholder="Please Enter Item Name"
            name="name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Box>
            <Typography
              variant="body2"
              fontWeight={500}
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Category
            </Typography>
            <Dropdown
              options={categories}
              selectedValue={category}
              onChange={(value) => setCategory(value)}
              placeholder="Select a category"
              isSearchable
            />
          </Box>
          <Stack direction="row" justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Add Item
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}

export default AddIngredientItemComponent;
