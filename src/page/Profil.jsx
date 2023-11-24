import React, {useState, useEffect} from "react";
import HeaderProfil from "../components/Users/HeaderProfil";
import SearchBar from "../components/Static/SearchBar";
import UserPlaylist from "../components/Users/userPlaylist";
import { useUserData } from "../service/userService";
import { getUserById } from "../service/apiService";

const Profil = () => {
  const { userId, accessToken } = useUserData();
  const [userData, setUserData] = useState([]);
  const [partenaireData, setPartenaireData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await getUserById(userId, accessToken);
          setUserData(response);
        }
        if (userData.idPartenaire) {
          const response = await getUserById(userData.idPartenaire, accessToken);
          setPartenaireData(response);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchUserData()
  }, [userId, accessToken, userData.idPartenaire])

  return (
    <>
      <SearchBar />
      <HeaderProfil userData={userData} />
      <UserPlaylist partenaireData={partenaireData}/>
    </>
  );
};

export default Profil;
