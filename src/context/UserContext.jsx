import { createContext, useState } from "react";
import tokenService from "../services/tokenService";

// Create UserContext
const UserContext = createContext();

// UserProvider Component
// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => tokenService.getToken());
  const [username, setUsername] = useState(() => tokenService.getUsername());
  const [userType, setUserType] = useState(() => tokenService.getUserType());
  const [permissions, setPermissions] = useState(() =>
    tokenService.getPermissions()
  );

  // Function to log in and store the token
  const login = (accessToken, username, nextUserType, userPermissions = []) => {
    tokenService.setToken(accessToken);
    tokenService.setUsername(username);
    tokenService.setUserType(nextUserType);
    tokenService.setPermissions(userPermissions);
    setToken(accessToken);
    setUsername(username);
    setUserType(nextUserType);
    setPermissions(userPermissions);
  };

  // Function to log out and clear stored token
  const logout = () => {
    tokenService.clearAuth();
    setToken(null);
    setUsername(null);
    setUserType(null);
    setPermissions([]);
  };

  return (
    <UserContext.Provider
      value={{ token, username, userType, permissions, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
