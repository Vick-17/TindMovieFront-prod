import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MovieRate from "./page/Rating_Movie";
import LoginPage from "./page/LoginPage";
import Profil from "./page/Profil";
import ChatRoom from "./components/Users/ChatRoom";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import PartenaireLink from "./page/ParetnaireLink";
import Swipe from "./page/Swipe";
import jwtDecode from "jwt-decode";
import QrcodeScanner from "./components/Users/QrcodeScanner";

const App = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolesLoaded, setRolesLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      setRoles(decodedToken.roles);
      setRolesLoaded(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/commentaire/:movieId" element={<MovieRate />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/partenaire" element={<PartenaireLink />} />
      <Route path="/qrscan" element={<QrcodeScanner />} />

      {roles.length > 0 && roles[0] === "ROLE_MODO" ? (
        <Route path="/swipe" element={<Swipe />} />
      ) : (
        <Route path="/404" element={<NotFound />} />
      )}


      {roles.length > 0 && roles[0] === "ROLE_MODO" ? (
        <Route path="/message" element={<ChatRoom />} />
      ) : (
        <Route path="/404" element={<NotFound />} />
      )}

      {rolesLoaded && (roles.includes("ROLE_USER") || roles.includes("ROLE_MODO")) ? (
        <Route path="/profil" element={<Profil />} />
      ) : (
        <Route path="/profil" element={<Navigate to="/login" />} />
      )}

    </Routes>
  );
}

export default App;
