const API_URL = "https://backend-production-048b.up.railway.app";
// const API_URL = "http://localhost:8080";



export const getAllMovieByUser = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/movie/allMovieByUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des films");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const getAllActor = async () => {
  try {
    const response = await fetch(`${API_URL}/actors/allActor`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des acteurs")
    }
    return await response.json();
  } catch (e) {
    throw e;
  }
};


export const getAllReal = async () => {
  try {
    const response = await fetch(`${API_URL}/realisator/allRealisator`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des Real")
    }
    return await response.json();
  } catch (e) {
    throw e;
  }
};

export const getAllGenre = async () => {
  try {
    const response = await fetch(`${API_URL}/genre/allGenre`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des Genres")
    }
    return await response.json();
  } catch (e) {
    throw e;
  }
};

export const getRecommendationByuser = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/movie/recommendation/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des films recommeder");
    }
    const data = await response.json();
    return data;
  } catch (error) {

  }
};

export const getLinkedUsername = async (userId, accessToken) => {
  try {
    const response = await fetch(
      `${API_URL}/users/linkedUsername?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du partenaire");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllMovie = async () => {
  try {
    const response = await fetch(`${API_URL}/movie/allMovies`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des films");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserIdByEmail = async (userEmail, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/users?email=${userEmail}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la recupération des données");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSwipeByUserId = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/like/alLike/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response === 200) {
      throw new Error("Erreur lors de la récupération des swipe");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMatchByUserId = async (userId1, userId2, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/match/matchByUser/${userId1}/${userId2}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response === 200) {
      throw new Error("Erreur lors de la récupération des match");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWatchedMovieByUserId = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/like/watchedMovie/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response === 200) {
      throw new Error("Erreur lors de la récupération des swipe");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/users/getUserById/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response === 200) {
      throw new Error("Erreur lors de la recupurération de l'utilisateur par l'id");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export const getMovieById = async (movieId) => {
  try {
    const response = await fetch(`${API_URL}/movie/getMovieById/${movieId}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des informations du film");
    }
    const movieData = await response.json();
    return movieData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getNoteMoyenne = async (movieId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/note/getNote/${movieId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la recupération de la moyenne")
    }
    return await response.json();

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommentForMovie = async (movieId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/comment/getComment/${movieId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la recupération des commentaire")
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPartenaire = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/partenaire`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des commentaires");
    }
    const responseText = await response.text();
    return responseText;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSearchMovie = async (query) => {
  try {
    const response = await fetch(`${API_URL}/movie/search?query=${query}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des films");
    }
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const getGenreFilter = async (genreId) => {
  try {
    const response = await fetch(`${API_URL}/genre/moviesByGenre?genreId=${genreId}`)
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des films")
    }
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const getRealisatorFilter = async (realisatorId) => {
  try {
    const response = await fetch(`${API_URL}/realisator/moviesByRealisator?realisatorId=${realisatorId}`)
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des films")
    }
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const getActorFilter = async (actorId) => {
  try {
    const response = await fetch(`${API_URL}/actors/moviesByActor?actorId=${actorId}`)
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des films")
    }
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}


export const userSignIn = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/inscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.status !== 201) {
      throw new Error("Erreur lors de l'inscription");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const partenaireLink = async (shareCode, userId, accessToken) => {
  try {
    const response = await fetch(
      `${API_URL}/users/link?shareCode=${shareCode}&userId=${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`

        },
      }
    );

    if (!response) {
      throw new Error("Réponse non reçue du serveur");
    }

    if (!response.ok) {
      throw new Error("Erreur lors de l'inscription d'un partenaire");
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const setWatchedMovie = async (watchedData, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/like/watched`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(watchedData),
    });
    if (!response) {
      throw new Error("Réponse non reçue du serveur");
    }

    if (!response.ok) {
      throw new Error("Erreur lors de l'inscription d'un partenaire");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const swipeLike = async (swipeData, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(swipeData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const addCommentAndNote = async (commentData, noteData, accessToken) => {
  try {
    const commentResponse = await fetch(`${API_URL}/comment/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(commentData),
    });
    const noteResponse = await fetch(`${API_URL}/note/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(noteData),
    });
    const commentResponseData = await commentResponse.json();
    const noteResponseData = await noteResponse.json();
    return commentResponseData + noteResponseData
  } catch (error) {
    throw error;
  }
};

export const userLogiIn = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.status !== 202) {
      throw new Error("Erreur lors de la connexion");

    } else {
      const token = response.headers.get("access_token");
      localStorage.setItem("userToken", token);
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSwipe = async (swipeData, accessToken) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    };
    const response = await fetch(`${API_URL}/like/delete`, {
      headers: headers,
      method: "DELETE",
      body: JSON.stringify(swipeData),
    });

    if (response.ok) {
      console.log("Swipe suprimmer");
    } else {
      console.error("Erreur lors de la supression", response.statusText);
    }
  } catch (error) {
    console.error("Erreur lors de la suppresion des article :", error);
  }
};