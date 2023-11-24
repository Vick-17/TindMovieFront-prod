import React, { useState, useMemo, useRef, useEffect } from "react";
import Movie from "./Movie";
import TinderCard from "react-tinder-card";
import IconSwipe from "../Static/iconSwipe";
import {
  getAllMovieByUser,
  swipeLike,
  deleteSwipe,
  getAllMovie,
} from "../../service/apiService";
import { useUserData } from "../../service/userService";

const MoviesCard = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { userId, accessToken } = useUserData();
  const [serverIsDown, setServerIsDown] = useState(false);

  // Référence pour suivre currentIndex
  const currentIndexRef = useRef(currentIndex);
  // Crée des références pour les cartes Tinder
  const childRefs = useMemo(() => Array(movies.length).fill(0).map((i) => React.createRef()), [movies]);
  // Détermine si l'utilisateur peut revenir en arrière
  const canGoBack = currentIndex < movies.length - 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (userId) {
          // Charge les films de l'utilisateur s'il est connecté
          response = await getAllMovieByUser(userId, accessToken);
        } else {
          // Charge tous les films si l'utilisateur n'est pas connecté
          response = await getAllMovie();
        }

        if (response.error) {
          setServerIsDown(true);
        } else {
          setMovies(response);
          setCurrentIndex(response.length - 1);
        }
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchData();
  }, [userId, accessToken]);

  const updateCurrentIndex = (val) => {
    // Met à jour currentIndex et la référence
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const outOfFrame = (name, idx) => {
    if (currentIndexRef.current >= idx && childRefs[idx].current) {
      // Restaure la carte qui a quitté l'écran
      childRefs[idx].current.restoreCard();
    }
  };


  const swiped = async (direction, nameToDelete, index) => {
    // Gère les gestes de balayage (gauche/droite)
    const swipeData = {
      userId: userId,
      filmId: movies[currentIndex].id,
      swipeDirection: direction,
    };

    try {
      const response = await swipeLike(swipeData, accessToken);

      if (response && !response.error) {
        // La réponse est valide, mettez à jour currentIndex
        updateCurrentIndex(index - 1);
      } else {
        console.error("Erreur lors de l'appel à swipeLike :", response.error);
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'appel à swipeLike :", error);
    }
  };


  const swipe = async (dir) => {
    if (currentIndex >= 0 && currentIndex < movies.length) {
      // Appelle la méthode swipe sur la carte actuelle
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;

    if (newIndex >= 0 && newIndex < childRefs.length) {
      // Met à jour l'index et restaure la carte
      updateCurrentIndex(newIndex);
      await childRefs[newIndex].current.restoreCard();
    }
    const swipeData = {
      userId: userId,
      filmId: movies[newIndex].id,
    };
    // Supprime le geste de balayage associé
    await deleteSwipe(swipeData, accessToken);
  };

  return (
    <div>
      {serverIsDown ? (
        <div>
          <p>Le serveur est down. Veuillez réessayer plus tard.</p>
        </div>
      ) : (
        <div>
          {movies.map((movie, index) => (
            <TinderCard
              ref={childRefs[index]}
              onSwipe={(dir) => swiped(dir, movie.titre, index)}
              className="swipe"
              key={movie.titre}
              onCardLeftScreen={() => outOfFrame(movie.titre, index)}
            >
              <Movie
                title={movie.titre}
                date={movie.dates}
                image={movie.image}
              />
            </TinderCard>
          ))}
          <IconSwipe
            onSwipeLeft={() => swipe("left")}
            onSwipeRight={() => swipe("right")}
            onReturn={() => goBack()}
            movieId={movies.length > 0 ? movies[currentIndex].id : null}
          />
        </div>
      )}
    </div>
  );
};

export default MoviesCard;
