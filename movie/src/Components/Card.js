const Card = ({ info, onViewMore }) => {
    let img_path = "https://image.tmdb.org/t/p/w500";
  
    return (
      <div className="movie">
        <img className="poster" src={img_path + info.poster_path} alt={info.title} />
        <div className="movie-details">
          <h4 className="movie-title">{info.title}</h4>
          <p className="rating">{info.vote_average}</p>
          <button onClick={() => onViewMore(info.id)}>View More</button>
        </div>
      </div>
    );
  };
  
  export default Card;
  