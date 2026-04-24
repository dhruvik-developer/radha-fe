/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dish01Icon,
  MenuRestaurantIcon,
  MoneyReceiveSquareIcon,
  Note03Icon,
  StickyNote02Icon,
  TaskAdd01Icon,
  TransactionHistoryIcon,
} from "@hugeicons/core-free-icons";
import { FiUsers } from "react-icons/fi";
import usePermissions from "../../hooks/usePermissions";
import { getAllBusinessProfiles } from "../../api/BusinessProfile";
import { setSidebarOpen } from "../../redux/uiSlice";

const SIDEBAR_WIDTH = 288;

const hugeIcon = (icon) => (
  <HugeiconsIcon icon={icon} size={22} color="currentColor" />
);

const menuItems = [
  {
    name: "Create Dish",
    path: "/dish",
    icon: hugeIcon(Dish01Icon),
    requiredPermission: "dishes.view",
  },
  {
    name: "Category",
    path: "/category",
    icon: hugeIcon(MenuRestaurantIcon),
    requiredPermission: "categories.view",
  },
  {
    name: "Order Management",
    path: "/order-management",
    icon: hugeIcon(Note03Icon),
    requiredPermission: [
      "quotations.view",
      "event_bookings.view",
      "invoices.view",
      "event_summary.view",
    ],
  },
  {
    name: "Stock",
    path: "/stock",
    icon: hugeIcon(StickyNote02Icon),
    requiredPermission: "stock.view",
  },
  {
    name: "Payment History",
    path: "/payment-history",
    icon: hugeIcon(TransactionHistoryIcon),
    requiredPermission: "payments.view",
  },
  {
    name: "Expense",
    path: "/expense",
    icon: hugeIcon(MoneyReceiveSquareIcon),
    requiredPermission: "expenses.view",
  },
  {
    name: "Create Ingredient",
    path: "/create-recipe-ingredient",
    icon: hugeIcon(TaskAdd01Icon),
    requiredPermission: "ingredients.view",
  },
  {
    name: "People",
    path: "/people",
    icon: <FiUsers size={22} />,
    requiredPermission: ["vendors.view", "eventstaff.view"],
  },
  {
    name: "Ground Checklist",
    path: "/ground-checklist",
    icon: hugeIcon(TaskAdd01Icon),
    requiredPermission: "ground.view",
  },
];

const activePaths = {
  "/dish": ["/dish", "/edit-dish", "/edit-item", "/pdf", "/edit-order-pdf"],
  "/category": [
    "/category",
    "/create-category",
    "/create-item",
    "/item-recipe",
    "/create-ingredient",
    "/edit-ingredient",
  ],
  "/order-management": [
    "/order-management",
    "/quotation",
    "/all-order",
    "/invoice",
    "/order-management/quotation",
    "/order-management/all-order",
    "/order-management/invoice",
    "/order-management/event-summary",
    "/quotation-pdf/",
    "/order-pdf/",
    "/share-order-pdf",
    "/view-ingredient",
    "/share-ingredient",
    "/share-ingredient-pdf",
    "/share-full-ingredient-pdf",
    "/share-outsourced",
    "/share-outsourced-pdf",
    "/invoice-order-pdf/",
    "/invoice-bill-pdf/",
    "/complete-invoice",
    "/event-summary",
  ],
  "/user": ["/user", "/add-rule"],
  "/people": [
    "/people",
    "/event-staff",
    "/vendor",
    "/waiter-types",
    "/add-staff",
    "/edit-staff",
    "/add-vendor",
    "/edit-vendor",
    "/staff-detail",
    "/fixed-staff-payments",
  ],
  "/create-recipe-ingredient": [
    "/create-recipe-ingredient",
    "/add-ingredient-item",
  ],
  "/ground-checklist": [
    "/ground-checklist",
    "/ground-categories",
    "/ground-items",
  ],
};

function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const open = useSelector((s) => s.ui.sidebarOpen);
  const { hasPermission } = usePermissions();
  const [businessLogo, setBusinessLogo] = useState("");
  const [isLogoLoading, setIsLogoLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessLogo = async () => {
      try {
        const response = await getAllBusinessProfiles();
        const profileList = Array.isArray(response?.data)
          ? response.data
          : response?.data
            ? [response.data]
            : [];
        setBusinessLogo(profileList[0]?.logo || "");
      } catch (error) {
        console.error("Failed to load business logo:", error);
        setBusinessLogo("");
      } finally {
        setIsLogoLoading(false);
      }
    };
    fetchBusinessLogo();
  }, []);

  const close = () => dispatch(setSidebarOpen(false));

  const isMenuItemActive = (itemPath) =>
    activePaths[itemPath]?.some((p) => location.pathname.startsWith(p)) ||
    location.pathname === itemPath;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={close}
      PaperProps={{
        sx: {
          width: SIDEBAR_WIDTH,
          bgcolor: (t) => t.palette.primary.light + "1f",
          border: 0,
        },
      }}
    >
      {/* Logo area */}
      <Stack alignItems="center" sx={{ p: 2.5, gap: 1 }}>
        {isLogoLoading ? (
          <Skeleton variant="rounded" width={180} height={80} />
        ) : businessLogo ? (
          <Box
            component="img"
            src={businessLogo}
            alt="Business Logo"
            onError={() => setBusinessLogo("")}
            sx={{ height: 80, maxWidth: 180, objectFit: "contain" }}
          />
        ) : (
          <Stack alignItems="center" spacing={0.5}>
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
              sx={{ lineHeight: 1.35 }}
            >
              Set your business profile logo in Settings tab.
            </Typography>
            <Link
              to="/settings"
              onClick={close}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="caption"
                fontWeight={600}
                color="primary.main"
                sx={{ "&:hover": { textDecoration: "underline" } }}
              >
                Go to Settings
              </Typography>
            </Link>
          </Stack>
        )}
      </Stack>

      {/* Menu list */}
      <List sx={{ px: 1.5, py: 1, gap: 1, display: "flex", flexDirection: "column" }}>
        {menuItems.map((item) => {
          if (
            item.requiredPermission &&
            !hasPermission(item.requiredPermission)
          ) {
            return null;
          }
          const active = isMenuItemActive(item.path);
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={close}
                selected={active}
                sx={{
                  borderRadius: 2,
                  py: 1.25,
                  px: 1.5,
                  gap: 1.5,
                  color: active ? "primary.contrastText" : "text.secondary",
                  bgcolor: active ? "primary.main" : "transparent",
                  boxShadow: active ? 2 : 0,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  },
                  "&:hover": {
                    bgcolor: active ? "primary.dark" : "action.hover",
                  },
                }}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: "background.paper",
                    color: "primary.main",
                    boxShadow: 1,
                  }}
                >
                  {item.icon}
                </Avatar>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;
