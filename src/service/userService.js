import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getUserIdByEmail } from "./apiService";

export const useUserData = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState();
  const [userRole, setUserRole] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  const token = useRef("");

  useEffect(() => {
    token.current = localStorage.getItem("userToken");

    if (token.current !== null) {
      const decodedTokens = jwtDecode(token.current);
      const isTokenValid = isTokenExpired(decodedTokens.exp);

      if (isTokenValid) {
        setUserEmail(decodedTokens.sub);
        setUserRole(decodedTokens.roles);
        setAccessToken(token.current);
        getUserIdByEmail(decodedTokens.sub, token.current).then((id) => {
          setUserId(id);
        });
      } else {
        localStorage.removeItem("userToken");
        <Navigate to="/login" />;
      }
    }
  }, []);

  const isTokenExpired = (expirationTime) => {
    const expirationTimeMs = expirationTime * 1000;
    return expirationTimeMs > Date.now();
  };

  return {
    userId,
    userEmail,
    userRole,
    accessToken,
  };
};
