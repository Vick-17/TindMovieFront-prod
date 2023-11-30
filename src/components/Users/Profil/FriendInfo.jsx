import React from 'react';

const FriendInfo = ({ friendName, friendInfo }) => {
    return (
        <div className="friend-info">
            <h2>{friendName}</h2>
            <p>{friendInfo}</p>
        </div>
    );
};

export default FriendInfo;
