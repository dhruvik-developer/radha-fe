/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Loader from "../../Components/common/Loader";
import EmptyState from "../../Components/common/EmptyState";
import Dropdown from "../../Components/common/formDropDown/DropDown";
import {
  FiPackage,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiAlertTriangle,
  FiDollarSign,
  FiBox,
  FiTrendingUp,
} from "react-icons/fi";

const unitLabels = {
  KG: "Kilogram",
  G: "Gram",
  L: "Litre",
  ML: "Millilitre",
  QTY: "Quantity",
};
const unitShort = {
  KG: "Kg",
  G: "g",
  L: "L",
  ML: "mL",
  QTY: "Qty",
};

function StatHero({ gradient, icon, label, value, shadowColor }) {
  return (
    <Card
      sx={{
        background: gradient,
        color: "#fff",
        borderRadius: 3,
        border: 0,
        position: "relative",
        overflow: "hidden",
        boxShadow: shadowColor
          ? `0 8px 24px -8px ${shadowColor}`
          : 3,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                opacity: 0.7,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              {label}
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function StockComponent({
  selectedCategory,
  setSelectedCategory,
  categories,
  items,
  loading,
  handleAddCategory,
  handleAddItem,
  onCategoryDelete,
  onItemDelete,
  handleIncreaseItem,
  handleDecreaseItem,
}) {
  const totalItems = items?.length || 0;
  const lowStockItems =
    items?.filter((i) => parseInt(i.quantity) <= parseInt(i.alert)).length || 0;
  const totalValue =
    items?.reduce((sum, i) => sum + Number(i.total_price || 0), 0) || 0;

  const canDeleteCategory =
    selectedCategory &&
    selectedCategory !== "low_stock" &&
    selectedCategory !== "all_items";

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: "background.paper" }}
    >
      {/* Title */}
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: (t) => t.palette.primary.light + "33",
            color: "primary.main",
            width: 44,
            height: 44,
          }}
        >
          <FiPackage size={20} />
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Stocks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your inventory &amp; stock levels
          </Typography>
        </Box>
      </Stack>

      {loading ? (
        <Loader message="Loading Stocks Details..." />
      ) : (
        <>
          {/* Controls Bar */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 2.5,
              bgcolor: (t) => t.palette.primary.light + "1a",
              borderColor: (t) => t.palette.primary.light + "66",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
            >
              {categories.length > 0 && (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  flex={1}
                  minWidth={0}
                >
                  <Dropdown
                    options={categories}
                    selectedValue={selectedCategory}
                    onChange={(value) => setSelectedCategory(value)}
                    placeholder="Select Category"
                  />
                  {canDeleteCategory && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onCategoryDelete(selectedCategory)}
                      title="Delete Stock Category"
                    >
                      <FiTrash2 size={18} />
                    </IconButton>
                  )}
                </Stack>
              )}
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FiPlus size={15} />}
                  onClick={handleAddCategory}
                >
                  Add Category
                </Button>
                {selectedCategory !== "low_stock" &&
                  selectedCategory !== "all_items" && (
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<FiPlus size={15} />}
                      onClick={handleAddItem}
                    >
                      Add Item
                    </Button>
                  )}
              </Stack>
            </Stack>
          </Paper>

          {/* Stats Summary */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatHero
                gradient={(t) =>
                  `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.primary.dark})`
                }
                icon={<FiBox size={22} />}
                label="Total Items"
                value={totalItems}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatHero
                gradient={
                  lowStockItems > 0
                    ? "linear-gradient(135deg, #dc2626, #991b1b)"
                    : "linear-gradient(135deg, #10b981, #047857)"
                }
                icon={
                  lowStockItems > 0 ? (
                    <FiAlertTriangle size={22} />
                  ) : (
                    <FiTrendingUp size={22} />
                  )
                }
                label={
                  lowStockItems > 0 ? "Low Stock Items" : "Inventory Status"
                }
                value={lowStockItems > 0 ? lowStockItems : "All Healthy"}
                shadowColor={lowStockItems > 0 ? "#ef4444" : "#10b981"}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatHero
                gradient="linear-gradient(135deg, #475569, #1e293b)"
                icon={<FiDollarSign size={22} />}
                label="Total Inventory Value"
                value={`₹${totalValue.toLocaleString("en-IN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`}
              />
            </Grid>
          </Grid>

          {/* Items Grid */}
          {items.length === 0 ? (
            <EmptyState
              icon={<FiPackage size={24} />}
              title="No Stock Items Found"
              message="Your inventory is currently empty. Add items to start tracking your stock levels."
            />
          ) : (
            <Grid container spacing={2}>
              {items.map((item) => {
                const alertStock = parseInt(item.alert);
                const quantity = parseInt(item.quantity);
                const isLowStock = quantity <= alertStock;
                const stockPercent =
                  alertStock > 0
                    ? Math.min((quantity / (alertStock * 4)) * 100, 100)
                    : 100;

                return (
                  <Grid
                    key={item.id}
                    size={{ xs: 12, md: 6, xl: 4 }}
                  >
                    <Card
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        height: "100%",
                        border: 2,
                        borderColor: isLowStock ? "error.light" : "divider",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: isLowStock
                            ? "error.main"
                            : "primary.light",
                          boxShadow: 4,
                        },
                      }}
                    >
                      {isLowStock && (
                        <Box
                          sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 6,
                            bgcolor: "error.main",
                          }}
                        />
                      )}
                      <CardContent>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            minWidth={0}
                            flex={1}
                          >
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 44,
                                height: 44,
                                bgcolor: isLowStock
                                  ? "error.main"
                                  : (t) => t.palette.primary.light + "33",
                                color: isLowStock ? "#fff" : "primary.main",
                              }}
                            >
                              <FiBox size={22} />
                            </Avatar>
                            <Box minWidth={0}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <Typography
                                  variant="subtitle1"
                                  fontWeight={700}
                                  noWrap
                                >
                                  {item.name}
                                </Typography>
                                {isLowStock && (
                                  <Chip
                                    size="small"
                                    label="Low Stock"
                                    color="error"
                                    sx={{
                                      height: 18,
                                      fontSize: "0.6rem",
                                      fontWeight: 800,
                                    }}
                                  />
                                )}
                              </Stack>
                              {item.categoryName && (
                                <Typography
                                  variant="caption"
                                  color="text.disabled"
                                  sx={{
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    fontWeight: 700,
                                  }}
                                >
                                  {item.categoryName}
                                </Typography>
                              )}
                            </Box>
                          </Stack>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => onItemDelete(item.id)}
                            title="Delete Item"
                          >
                            <FiTrash2 size={16} />
                          </IconButton>
                        </Stack>

                        {/* Quantity Display */}
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-end"
                          sx={{ mb: 2 }}
                        >
                          <Box>
                            <Typography
                              variant="h4"
                              fontWeight={800}
                              color={isLowStock ? "error.main" : "primary.main"}
                            >
                              {item.quantity}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.disabled"
                              sx={{
                                textTransform: "uppercase",
                                fontWeight: 700,
                              }}
                            >
                              Current {unitLabels[item.type] || item.type}
                            </Typography>
                          </Box>
                          <Box textAlign="right">
                            <Typography variant="body2" fontWeight={700}>
                              {item.alert}{" "}
                              {unitShort[item.type] || item.type}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.disabled"
                              sx={{
                                textTransform: "uppercase",
                                fontWeight: 700,
                              }}
                            >
                              Minimum Level
                            </Typography>
                          </Box>
                        </Stack>

                        {/* Stock Level Bar */}
                        <LinearProgress
                          variant="determinate"
                          value={stockPercent}
                          color={isLowStock ? "error" : "primary"}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "action.hover",
                            mb: 2.5,
                          }}
                        />

                        {/* Financial Info */}
                        <Grid container spacing={1.5} sx={{ mb: 2 }}>
                          <Grid size={6}>
                            <Box
                              sx={{
                                px: 1.5,
                                py: 1,
                                borderRadius: 2,
                                bgcolor: "action.hover",
                                border: 1,
                                borderColor: "divider",
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.disabled"
                                sx={{
                                  textTransform: "uppercase",
                                  fontWeight: 700,
                                  fontSize: "0.6rem",
                                  letterSpacing: 1,
                                }}
                              >
                                Net Price
                              </Typography>
                              <Typography
                                variant="body2"
                                fontWeight={800}
                                color="text.primary"
                              >
                                ₹{Number(item.nte_price || 0).toFixed(2)}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid size={6}>
                            <Box
                              sx={{
                                px: 1.5,
                                py: 1,
                                borderRadius: 2,
                                bgcolor: (t) => t.palette.primary.light + "14",
                                border: 1,
                                borderColor: (t) =>
                                  t.palette.primary.light + "66",
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="primary.main"
                                sx={{
                                  textTransform: "uppercase",
                                  fontWeight: 700,
                                  fontSize: "0.6rem",
                                  letterSpacing: 1,
                                  opacity: 0.8,
                                }}
                              >
                                Stock Value
                              </Typography>
                              <Typography
                                variant="body2"
                                fontWeight={800}
                                color="primary.main"
                              >
                                ₹{Number(item.total_price || 0).toFixed(2)}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Controls */}
                        <Stack direction="row" spacing={1}>
                          <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            startIcon={<FiPlus size={14} />}
                            onClick={() => handleIncreaseItem(item)}
                            sx={{ fontWeight: 700, textTransform: "uppercase" }}
                          >
                            Stock In
                          </Button>
                          <Button
                            fullWidth
                            color="error"
                            variant="outlined"
                            startIcon={<FiMinus size={14} />}
                            onClick={() => handleDecreaseItem(item)}
                            sx={{ fontWeight: 700, textTransform: "uppercase" }}
                          >
                            Stock Out
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </>
      )}
    </Paper>
  );
}

export default StockComponent;
