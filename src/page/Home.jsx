import React, { useState, useEffect } from 'react';
import CardList from '../components/Movie/CardList';
import SearchBar from '../components/Static/SearchBar';
import { getAllMovie, getAllMovieByUser } from '../service/apiService';
import Loader from "../components/Static/Loader";
import { useUserData } from '../service/userService';
import FilterBar from '../components/Static/FilterBar';
import Pagination from '../components/Static/Pagination';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [filterResults, setFilterResults] = useState([]);
    const [displayedMovies, setDisplayedMovies] = useState([]);
    const { userId, accessToken } = useUserData();
    const [displayMode, setDisplayMode] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const updateSearchResults = (results) => {
        setSearchResults(results);
        setDisplayMode("search");
    }
    const updateFilter = (resultsFilter) => {
        if (resultsFilter.length > 0) {
            const newDisplayedMovies = resultsFilter.filter(movie => !displayedMovies.includes(movie));
            setFilterResults(resultsFilter);
            setDisplayedMovies((prevMovies) => [...prevMovies, ...newDisplayedMovies]);
            setDisplayMode("filter");
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const response = await getAllMovieByUser(userId, accessToken);
                    setMovies(response);
                    setIsLoading(false);
                } else {
                    const response = await getAllMovie();
                    setMovies(response);
                    setIsLoading(false);
                }
            } catch (e) {
                console.error("Une erreur s'est produite : ", e);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId, accessToken]);

    useEffect(() => {
        const handleResize = () => {
            // Ajustez le nombre d'éléments par page en fonction de la largeur de l'écran
            if (window.innerWidth >= 1200) {
                setItemsPerPage(8);
            } else if (window.innerWidth >= 925) {
                setItemsPerPage(6);
            } else {
                setItemsPerPage(4);
            }
        };

        // Appelez la fonction handleResize au chargement de la page et lors du redimensionnement
        handleResize();
        window.addEventListener("resize", handleResize);

        // Nettoyez l'écouteur d'événements lors du démontage du composant
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const removeMovieFromList = (movieId) => {
        setMovies((prevMovies) => {
            return prevMovies.filter((movie) => movie.id !== movieId);
        });
    };

    let displayMovies = [];

    if (displayMode === "search" && searchResults.length > 0) {
        displayMovies = searchResults;
    } else if (displayMode === "filter" && filterResults.length > 0) {
        displayMovies = filterResults;
    } else {
        displayMovies = movies;
    }

    const paginatedMovies = displayMovies.slice(startIndex, endIndex);
    const totalPages = Math.ceil(displayMovies.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <SearchBar updateSearchResults={updateSearchResults} />
            <FilterBar updateFilter={updateFilter} displayedMovies={displayedMovies} />
            <div className="all_movie_container">
                {isLoading ? (
                    <Loader />
                ) : (
                    paginatedMovies.map((movie, index) => (
                        <CardList
                            key={index}
                            title={movie.titre}
                            image={movie.image}
                            content={movie.synopsis}
                            subheader={movie.dates}
                            movieId={movie.id}
                            userId={userId}
                            onRemove={(movieId) => removeMovieFromList(movieId)}
                        />
                    ))
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </>
    );
};

export default Home;
