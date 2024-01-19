import React from "react";

const Card = ({ info }) => {
  const img_path = "https://image.tmdb.org/t/p/w500";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <div className="movie">
        <img className="poster" src={img_path + info.poster_path} alt={info.title} />
        <div className="movie-details">
          <div className="box">
            <h4 className="movie-title">{info.title}</h4>
            <p className="rating">{info.vote_average}</p>
          </div>
          <div className="overview">
            <p className="release-date">Release Date: {formatDate(info.release_date)}</p>
            <p>{info.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
