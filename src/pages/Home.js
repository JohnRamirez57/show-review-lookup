import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuery, updateShowFavorites } from "./store.ts";

//implement the favorite show button and make sure to update store.ts (also make it to where if user comes back from their personal favorites tab/page, it saves the previously searched up query shows and prints out the same shows before they entered the new tab/page)

export const Home = () => {
  const dispatch = useDispatch();
  const [currentSearch, setCurrentSearch] = useState("");
  const [viewFavorites, setViewFavorites] = useState(false);

  const handleKeyDown = (e) =>{
    if (e.key === "Enter"){
      handleSearch()
    }
  }

  const toggleViewFavorites = () => {
    // console.log("Old Val: " + viewFavorites)
    const newValue = !viewFavorites;
    // console.log("Const New Val: " + newValue)
    setViewFavorites(newValue);
    // console.log("Updated Val: " + viewFavorites)
    dispatch(updateShowFavorites(newValue));
    
    const button = document.getElementById("fav-button");
    button.textContent = newValue ? "Hide Favorites" : "View Favorites";
    handleFavoriteView()
  }

  const updateCurrentSearch = (e) => {
    setCurrentSearch(e.target.value)
  }

  const handleSearch = () => {
    dispatch(updateQuery(currentSearch))
  };

  const handleFavoriteView = () => {
    dispatch(updateShowFavorites(viewFavorites))
  }

  return (
    <div>
      <h1 className="header">Search the rating for any show!</h1>
      <div className="search-div">
        <input onChange={(e) => updateCurrentSearch(e)} className="search-input" id="search-field" type="text" placeholder="Enter the show name here!" onKeyDown={handleKeyDown}></input>
        <button className="search-button" onClick={handleSearch}>Search</button>
        <button className="favorites-button" id="fav-button" onClick={() => {toggleViewFavorites(); handleFavoriteView()}}>View Favorites</button>
      </div>
    </div>
  )
}