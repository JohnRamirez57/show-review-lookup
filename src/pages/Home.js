import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuery } from "./store.ts";

//implement the favorite show button and make sure to update store.ts (also make it to where if user comes back from their personal favorites tab/page, it saves the previously searched up query shows and prints out the same shows before they entered the new tab/page)

export const Home = () => {
  const dispatch = useDispatch();
  const [currentSearch, setCurrentSearch] = useState("");

  const updateCurrentSearch = (e) => {
    setCurrentSearch(e.target.value)
  }

  const handleSearch = () => {
    dispatch(updateQuery(currentSearch))
  };

  return (
    <div>
      <h1 className="header">Search the rating for any show!</h1>
      <div className="search-div">
        <input onChange={(e) => updateCurrentSearch(e)} className="search-input" id="search-field" type="text" placeholder="Enter the show name here!"></input>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
    </div>
  )
}