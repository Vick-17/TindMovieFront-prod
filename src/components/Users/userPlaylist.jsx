import React, { useEffect, useState } from "react";
import Playlist from "../Movie/Playlist";
import IconButton from "@mui/material/IconButton";
import {
  getSwipeByUserId,
  getWatchedMovieByUserId,
  getRecommendationByuser
} from "../../service/apiService";
import { useUserData } from "../../service/userService";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Loader from "../Static/Loader";

const UserPlaylist = ({ partenaireData }) => {
  const { userId, accesToken } = useUserData();
  const [swipe, setSwipe] = useState([]);
  const [recommendMovies, setRecommendMovies] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      return;
    }
    getSwipeByUserId(userId, accesToken)
      .then((response) => {
        setSwipe(response);
      })
      .catch((error) => {
        console.error("Erreur c'est produite :", error);
      });

    getRecommendationByuser(userId, accesToken)
      .then((response) => {
        setRecommendMovies(response);
      })
      .catch((error) => {
        console.error("Erreur c'est produite :", error);
      })
    getWatchedMovieByUserId(userId, accesToken)
      .then((response) => {
        setWatchedMovies(response);
      })
      .catch((error) => {
        console.error("Erreur c'est produite :", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId, accesToken]);

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="user_block_container">
        <div className="header_playlist">
          {partenaireData === null ? (
            <h5>Ma playlist</h5>
          ) : (
            <h5>Ma playlist avec ({partenaireData.username})</h5>
          )}
          <IconButton onClick={toggleFullScreen} style={{ padding: "0" }}>
            <FullscreenIcon />
          </IconButton>
        </div>
        <div className={`playlist ${fullScreen ? "fullScreen" : ""}`}>
          {swipe.length === 0 ? (
            <p>Aucun film pour le moment.</p>
          ) : (
            swipe.map((movie) => (
              <Playlist
                key={movie.id}
                titre={movie.titre}
                userId={userId}
                filmId={movie.id}
              />
            ))
          )}
        </div>
      </div>
      <div className="user_block_container">
        <h5>Suggestion</h5>
        <div className={`playlist ${fullScreen ? "fullScreen" : ""}`}>

          {recommendMovies.length === 0 ? (
            <p>Aucun film recommender pour le moment</p>
          ) : (recommendMovies.map((recommendMovie) => (
            <Playlist
              key={recommendMovie.id}
              titre={recommendMovie.titre}
              userId={userId}
              filmId={recommendMovie.id}
            />
          ))
          )}
        </div>
      </div>
      <div className="user_block_container">
        <h5>Films vus</h5>
        <div className={`playlist ${fullScreen ? "fullScreen" : ""}`}>
          {watchedMovies.length === 0 ? (
            <p>Auun films regarder</p>
          ) : (watchedMovies.map((watchedMovie) => (
            <Playlist
              key={watchedMovie.id}
              titre={watchedMovie.titre}
              userId={userId}
              filmId={watchedMovie.id}
              showNotes={true}
            />
          )))}
        </div>
      </div>
    </>
  );
};

export default UserPlaylist;
