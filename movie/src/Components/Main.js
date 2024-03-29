import React, { useEffect, useState } from "react";
import Card from "./Card";
// API keys and base URL for making requests

let API_key = "&api_key=fe3b1b943b687c808f55babb1136a785";
let API_key_search= "fe3b1b943b687c808f55babb1136a785";

let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedy"];

const Main = () => {
  
//The useState is a Hook in React that allows functional components to manage state. 
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState("");

  const [yearFilter, setYearFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
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
  
// The useEffect hook is a part of the Hooks API in React. It provides a way to perform side effects in functional components. Side effects can include data fetching, subscriptions, manual DOM manipulations, and more.
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
  {movieData.length === 0 ? (
    <p className="notfound">Not found</p>
  ) : (
    movieData.map((res, pos) => {
      return <Card info={res} key={pos} />;
    })
  )}
</div>

  
      <div className="footer">
        <h4>Copyright © 2024 | Movie Matrix</h4>
        <p>Created by Erza Merovci and Erza Qorri</p>
      </div>
    </>
  );
  
};
export default Main;
