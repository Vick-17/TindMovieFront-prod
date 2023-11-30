import React from 'react';

const ProfilePicture = ({ imageUrl, badge }) => {
    return (
        <div className="profile-picture">
            <img src={imageUrl} alt="Profil" />
            {badge && <div className="badge">{badge}</div>}
        </div>
    );
};

export default ProfilePicture;
