import React, { useEffect, useState } from 'react'; 
import Card from './Card'
 let API_key = "&api_key=fe3b1b943b687c808f55babb1136a785";
 let base_url = "https://api.themoviedb.org/3";
 let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key; 
 let arr = ["Popular","Theatre","Kids","Drama","Comedy"];

const Main = () => {
 const[movieData,setData]=useState([]);
 const  [url_set,setUrl] = useState(url);

 useEffect(() => {
  fetch(url_set).then(res=>res.json()).then(data => {
    setData(data.results); 
  });
}, [url_set]);



  return (
    <>
    
      <div className="header">
        <nav>
            <ul>
            <li>
            <a href="#">Popular</a>
          </li>
          <li>
            <a href="#">Theatre</a>
          </li>
          <li>
            <a href="#">Kids</a>
          </li>
          <li>
            <a href="#">Drama</a>
          </li>
          <li>
            <a href="#">Comedy</a>
          </li>
            </ul>
         
        </nav>
        <form>
            <div className="search-btn">
                <input type="text" placeholder="Enter movie name" className="inputText"></input>
                <button><i class="fas fa-search"></i></button>

            </div>
        </form>
      </div>
      <div className='container'>
         
         {
          (movieData.length==0)? <p className='notfound'>Not found</p>:
          movieData.map((res,pos)=>{
            return(
              <Card info = {res}key ={pos}></Card>
            )
          })
         }
      </div>
    </>
  );
};
export default Main;
