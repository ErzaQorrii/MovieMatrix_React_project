import React from 'react';
import Card from './Card'
const Main = () => {
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
         <Card/> 
         <Card/> 
         <Card/> 
         <Card/> 
         <Card/> 
         <Card/> 
         
      </div>
    </>
  );
};
export default Main;
