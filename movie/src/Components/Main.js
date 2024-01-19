import React, { useEffect, useState } from "react";
import Card from "./Card";

let API_key = "&api_key=fe3b1b943b687c808f55babb1136a785";
let API_key_search= "fe3b1b943b687c808f55babb1136a785";

let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedy"];
const MovieModal = ({ movie, similarMovies, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal">
      {/* ... */}
        <div className="movie-details">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <div className="additional-details">
            <p>Release date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
          </div>
        </div>
      <div className="similar-movies">
        <h3>Similar Movies</h3>
        {similarMovies && similarMovies.map(similarMovie => (
          <div key={similarMovie.id}>
            <p>{similarMovie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
const Main = () => {
  
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState("");

  const [yearFilter, setYearFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  const genres = [
    { name: 'Action', id: 28 },
    { name: 'Adventure', id: 12 },
    { name: 'Animation', id: 16 },
    { name: 'Comedy', id: 35 },
    { name: 'Crime', id: 80 },
    { name: 'Kids', id: 99 },
    { name: 'Drama', id: 18 },
    { name: 'Family', id: 10751 },
    { name: 'Fantasy', id: 14 },
    { name: 'History', id: 36 },
    { name: 'Horror', id: 27 },
    { name: 'Music', id: 10402 },
    { name: 'Mystery', id: 9648 },
    { name: 'Romance', id: 10749 },
    { name: 'Science Fiction', id: 878 },
    { name: 'TV Movie', id: 10770 },
    { name: 'Thriller', id: 53 },
    { name: 'War', id: 10752 },
    { name: 'Western', id: 37 }
  ];


  const applyFilters = () => {
    let filterUrl = base_url + "/discover/movie?" + API_key;
  
    if (yearFilter) {
      filterUrl += `&primary_release_year=${yearFilter}`;
    }
    if (genreFilter) {
      filterUrl += `&with_genres=${genreFilter}`;
    }
    if (ratingFilter) {
    
      const ratingLowerBound = parseFloat(ratingFilter) - 0.1;
      const ratingUpperBound = parseFloat(ratingFilter) + 0.1;
      filterUrl += `&vote_average.gte=${ratingLowerBound}&vote_average.lte=${ratingUpperBound}`;
    }
    setUrl(filterUrl);
  };

  const handleViewMoreClick = (movieId) => {
    fetchMovieDetailsAndSimilar(movieId);
  };
  
  
  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });
  }, [url_set]);
  

  const getData = (movieType) => {
    if (movieType == "Popular") {
      url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
    }
    if (movieType == "Theatre") {
      url =
        base_url +
        "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" +
        API_key;
    }
    if (movieType == "Kids") {
      url =
        base_url +
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
        API_key;
    }
    if (movieType == "Drama") {
      url =
        base_url +
        "/discover/movie?with_genres=18&primary_release_year=2014" +
        API_key;
    }
    if (movieType == "Comedy") {
      url =
        base_url +
        "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
        API_key;
    }
    setUrl(url);
  };
  const searchMovie = (evt) => {
    evt.preventDefault();
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      const searchUrl = `${base_url}/search/movie?api_key=${API_key_search}&query=${encodeURIComponent(trimmedSearch)}`;
      console.log("Searching for:", searchUrl); // Log the search URL
      setUrl(searchUrl);
    }
  };
  const fetchMovieDetailsAndSimilar = (movieId) => {
    // Fetch movie details
    let apiKey = "fe3b1b943b687c808f55babb1136a785";
  
    // Fetch movie details
    const movieDetailsUrl = `${base_url}/movie/${movieId}?api_key=${apiKey}`;
    
    fetch(movieDetailsUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSelectedMovie(data);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setIsModalOpen(false); // Properly handle the modal close on error
      });



    // Fetch similar movies
    fetch(`${base_url}/movie/${movieId}/similar?api_key=${API_key_search}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setSimilarMovies(data.results || []);
      })
      .catch(error => {
        console.error("Error fetching similar movies:", error);
      });
  };
  
  
  
  
  return (
    <>
      <div className="header">
        <nav>
          <ul>
            {arr.map((value) => {
              return (
                <li key={value}>
                  <a
                    href="#"
                    name={value}
                    onClick={(e) => {
                      getData(e.target.name);
                    }}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <form onSubmit={searchMovie}>
      <div className="search-btn">
        <input
          type="text"
          placeholder="Enter movie name"
          className="inputText"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </form>
        
      </div>
      <div className="filters">
        <label>
          Year:
          <input
            type="text"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          />
        </label>
        <label>
          Genre:
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Rating:
          <input
            type="text"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          />
        </label>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <div className="container">
       {movieData.map((movie) => (
    <Card
      key={movie.id}
      info={movie}
      onViewMore={() => handleViewMoreClick(movie.id)}
    />
       ))}
       </div>
       {isModalOpen && (
  <MovieModal
    movie={selectedMovie}
    similarMovies={similarMovies}
    onClose={() => setIsModalOpen(false)}
  />
)}
  
      <div className="footer">
        <h4>Copyright © 2024 | Movie Matrix</h4>
      </div>
    </>
  );
  

};
export default Main;
