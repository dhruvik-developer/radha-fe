import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { USER_ROLE_ADMIN } from "../../services/tokenService";
import { toggleSidebar } from "../../redux/uiSlice";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, userType, logout } = useContext(UserContext);

  useEffect(() => {
    if (!token || userType !== USER_ROLE_ADMIN) {
      logout();
      navigate("/login");
    }
  }, [token, userType, navigate, logout]);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Header toggleSidebar={() => dispatch(toggleSidebar())} />
        <Box
          sx={{
            flex: 1,
            overflowX: "hidden",
            overflowY: "auto",
            p: { xs: 1.5, sm: 2.5 },
            bgcolor: "background.default",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
