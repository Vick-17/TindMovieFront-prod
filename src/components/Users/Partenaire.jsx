import React, { useRef } from 'react';
import { partenaireLink, getLinkedUsername } from '../../service/apiService';
import { useUserData } from '../../service/userService';
import toast from 'react-hot-toast';
import IconButton from "@mui/material/IconButton";
import SearchBar from '../Static/SearchBar';

const Partenaire = () => {
    const {userId, accesToken, userRole} = useUserData();
    const inputRef = useRef();

    const handlSubmit = async () => {
        const shareCode = inputRef.current.value;
        try {
            const response = await partenaireLink(shareCode, userId, accesToken);

            if (response.ok) {
                toast.success("Liaison avec le partenaire réussie.");
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage);
            }

            const linkedUserResponse = await getLinkedUsername(userId, accesToken);
            if (linkedUserResponse.ok) {
                const linkedUsername = await linkedUserResponse.text();
                toast.success(`Vous êtes maintenant lié avec : ${linkedUsername}`);
            } else {
                toast.error("Erreur lors de la récupération du partenaire");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                "Une erreur s'est produite lors de la liaison avec le partenaire."
            );
        }
    };

    if (!userRole) {
        return <div>Chargement en cours...</div>;
    }

    return (
        <div>
            <SearchBar />
            <input
                type="text"
                ref={inputRef}
                placeholder="Ajouter un code partenaire"
            />
            <IconButton
                onClick={handlSubmit}
                style={{ fontSize: "17px", color: "black" }}
            >
                Ajouter
            </IconButton>
        </div>
    );
};

export default Partenaire;