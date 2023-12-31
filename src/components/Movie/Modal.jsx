import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { addCommentAndNote } from "../../service/apiService";
import { useUserData } from "../../service/userService";
import { toast, Toaster } from "react-hot-toast";

const Modal = ({ show, onClose, filmId }) => {
  const [noteValue, setNoteValue] = useState(0);
  const [comment, setComment] = useState("");
  const { userId, accessToken } = useUserData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      content: comment,
      usersId: userId,
      filmId: filmId,
    };
  
    const noteData = {
      // Récupérer la valeur de la note depuis noteRef
      rating: noteValue,
      userId: userId,
      movieId: filmId,
    };
  
    // Appeler la fonction d'envoi de données à l'API
    try {
      await addCommentAndNote(commentData, noteData, accessToken);
      onClose();  
    } catch (error) {
      toast.error("Vous avez déjà noter  se films");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="modal">
        <h2>Noter le Film</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="noteSlider">{noteValue}/5</label>
            <Slider
              id="noteSlider"
              aria-label="Temperature"
              value={noteValue}
              onChange={(e, newValue) => setNoteValue(newValue)}
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={0}
              max={5}
            />
            <TextField
              id="outlined-textarea"
              label="Votre commentaire"
              placeholder="commentaire"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              style={{width:'100%', marginTop: '20px'}}
            />
          </div>
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Envoyer
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
