import { useState, useEffect, useMemo, useRef } from "react";
import jwtDecode from "jwt-decode";
import { getUserIdByEmail } from "./apiService";

export const useUserData = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState();
  const [userRole, setUserRole] = useState([]);
  const [accesToken, setAccesToken] = useState("")

  const token = useRef("");

  useEffect(() => {
    token.current = localStorage.getItem("userToken");
    if (token.current !== null) {
      const decodedTokens = jwtDecode(token.current);
      setUserEmail(decodedTokens.sub);
      setUserRole(decodedTokens.roles);
      setAccesToken(token.current)
      getUserIdByEmail(decodedTokens.sub, token.current).then((id) => {
        setUserId(id);
      });
    }
  }, []);
  
  const memoUser = useMemo(() => {
    return {
      userId,
      userEmail,
      userRole,
      accesToken
    };
  }, [userId, userEmail, userRole, accesToken]);

  return memoUser;
};
