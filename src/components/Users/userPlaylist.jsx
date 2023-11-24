import React, { useEffect, useState } from "react";
import Playlist from "../Movie/Playlist";
import IconButton from "@mui/material/IconButton";
import {
  getSwipeByUserId,
  getWatchedMovieByUserId,
  getRecommendationByuser,
  getMatchByUserId
} from "../../service/apiService";
import { useUserData } from "../../service/userService";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Loader from "../Static/Loader";

const UserPlaylist = ({ partenaireData }) => {
  const { userId, accessToken } = useUserData();
  const [swipe, setSwipe] = useState([]);
  const [recommendMovies, setRecommendMovies] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      return;
    }
    if (partenaireData.length === 0) {
      getSwipeByUserId(userId, accessToken)
        .then((response) => {
          setSwipe(response);
        })
        .catch((error) => {
          console.error("Erreur c'est produite :", error);
        });
    } else {
      getMatchByUserId(userId, partenaireData.id, accessToken)
        .then((response) => {
          setSwipe(response);
        })
        .catch((error) => {
          console.error("Erreur c'est produite :", error);
        });
    }


    getRecommendationByuser(userId, accessToken)
      .then((response) => {
        setRecommendMovies(response);
      })
      .catch((error) => {
        console.error("Erreur c'est produite :", error);
      })
    getWatchedMovieByUserId(userId, accessToken)
      .then((response) => {
        setWatchedMovies(response);
      })
      .catch((error) => {
        console.error("Erreur c'est produite :", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId, accessToken, partenaireData]);

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="playlist_container">
      <div className="user_block_container">
        <div className="header_playlist">
          {partenaireData.length === 0 ? (
            <h5>Ma playlist</h5>
          ) : (
            <h5>Ma playlist avec {partenaireData.username}</h5>
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
              // Vérifie si le film n'est pas dans la liste des films regardés
              !watchedMovies.some((watchedMovie) => watchedMovie.id === movie.id) && (
                <Playlist
                  key={movie.id}
                  titre={movie.titre}
                  userId={userId}
                  filmId={movie.id}
                />
              )
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
            <>
              <Playlist
                key={recommendMovie.id}
                titre={recommendMovie.titre}
                userId={userId}
                filmId={recommendMovie.id}
              /> 
            </>
          ))
          )}
        </div>
      </div>
      <div className="user_block_container">
        <h5>Films vus</h5>
        <div className={`playlist ${fullScreen ? "fullScreen" : ""}`}>
          {watchedMovies.length === 0 ? (
            <p>Aucun films regarder</p>
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
    </div>
  );
};

export default UserPlaylist;
