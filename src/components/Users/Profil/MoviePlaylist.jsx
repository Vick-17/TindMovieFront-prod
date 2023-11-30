import React from 'react';

const MoviePlaylist = ({ title, movies }) => {
    return (
        <div className="movie-playlist">
            <h2>{title}</h2>
            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>{movie}</li>
                ))}
            </ul>
        </div>
    );
};

export default MoviePlaylist;
