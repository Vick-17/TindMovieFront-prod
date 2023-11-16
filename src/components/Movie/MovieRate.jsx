import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import {
  getCommentForMovie,
  getNoteMoyenne,
  getUserById,
} from "../../service/apiService";
import { useState } from "react";
import { useUserData } from "../../service/userService";

const MovieRate = ({ movieAffiche, title }) => {
  const { movieId } = useParams();
  const [comment, setComment] = useState([]);
  const [commentWithAuthors, setCommentWithAuthors] = useState([]);
  const [note, setNote] = useState();
  const { accesToken } = useUserData();
  

  useEffect(() => {
    getNoteMoyenne(movieId, accesToken)
      .then((response) => {
        if (response.error) {
          console.log("marche pas");
        } else {
          setNote(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    getCommentForMovie(movieId, accesToken)
      .then((response) => {
        if (response.error) {
          console.log("marche pas non plus");
        } else {
          setComment(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieId, accesToken]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const commentsWithAuthors = await Promise.all(
        comment.map(async (commentaire) => {
          const userId = commentaire.usersId;
          const user = await getUserById(userId, accesToken);
          return { ...commentaire, author: user.username };
        })
      );
      setCommentWithAuthors(commentsWithAuthors);
    };
    fetchUserNames();
  }, [comment, accesToken]);
  
  return (
    <div className="movie_rate_container">
      <h5>{title}</h5>
      <div className="rate_img_container">
        <img src={movieAffiche} alt="Affiche du film" />
      </div>
      <div className="rate_star_container">
        {note !== undefined ? (
          <Rating name="half-rating-read" value={note} precision={0.5} readOnly />
        ) : (
          <p>Chargement de la note...</p>
        )}
      </div>
      <div className="comment_container">
        {commentWithAuthors !== undefined ? (
          commentWithAuthors.map((commentaire, index) => (
            <Comment
              content={commentaire.content}
              author={commentaire.author || "Auteur inconnu"}
              key={index}
            />
          ))
        ) : (
          <p>Chargement des commentaires...</p>
        )}
      </div>
    </div>
  );
};

export default MovieRate;
