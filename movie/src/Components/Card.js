import react from "react";

const Card=()=>{
    return(
        <>
        <div className="movie">
            <img className="poster" src="poster.jpg"></img>
            <div className="movie-details">
                <div className="box">
                    <h4 className="movie-title">Movie Title</h4>
                    <p className="rating">9.8</p>
                </div>
                <div className="overview">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
            </div>
        </div>
      
      
        </>
    )
}

export default Card;