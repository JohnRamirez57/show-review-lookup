import { useEffect, useState } from "react";
import { CleanShowData } from "../components/CleanShowData";
import { useSearchShows, useShowWithIDS } from "../components/GetShows"
import { useSelector, useDispatch } from "react-redux";
import { updateFavoritedShows } from "./store.ts";


export const Results = () => {
  const dispatch = useDispatch()
  const {shows, isLoading: searchLoading, isError: searchError, searchShows} = useSearchShows();
  const {favoriteShows, isLoading: favoritesLoading, isError: favoritesError, searchShowID} = useShowWithIDS()
  const [returnedCleanedData, setReturnedCleanedData] = useState([]) //results data
  const [showData, setShowData] = useState([]); //main data to make results from
  const currentSearch = useSelector((state) => state.shows.value.query) || ""
  const currentFavoritedShows = useSelector((state) => state.shows.value.favoritedShows) //returns ids of favorite shows
  const toggleFavoriteShows = useSelector((state) => state.shows.value.showFavorites)

  useEffect(() =>{
    setReturnedCleanedData([])
    searchShows(currentSearch);
  }, [currentSearch])

  useEffect(() => {
    if (toggleFavoriteShows) {
      searchShowID(currentFavoritedShows);
    } else {
      setShowData(returnedCleanedData);
    }
  }, [toggleFavoriteShows]);

  useEffect(() => {
    if (toggleFavoriteShows) {
      const cleanedData = favoriteShows && favoriteShows.length > 0 
        ? CleanShowData(favoriteShows, true, currentFavoritedShows)
        : [];
      setShowData(cleanedData);
    }
  }, [favoriteShows, toggleFavoriteShows, currentFavoritedShows]);

  useEffect(() => {
    if (shows && shows.length > 0) {
      const cleanedData = CleanShowData(shows, false, currentFavoritedShows);
      setReturnedCleanedData(cleanedData);
      if (!toggleFavoriteShows) {
        setShowData(cleanedData);
      }
    }
  }, [shows, currentFavoritedShows, toggleFavoriteShows]);

  const fixDate = (showDate) =>{
    if (!showDate) return "N/A"
    const dashIndex = showDate.indexOf('-');
    const showYear = showDate.slice(0, dashIndex)
    const yearlessShowDate = showDate.slice(dashIndex + 1)
    return yearlessShowDate + "-" + showYear
  }

  const removeTags = (tag, showSummary) => {
  let summary = showSummary;
  const closingTag = tag.slice(0, 1) + "/" + tag.slice(1);
  while (summary.includes(tag)) {
    summary = summary.replace(tag, ""); 
  }
  while (summary.includes(closingTag)) {
    summary = summary.replace(closingTag, "");  
  }
  return summary;
  }

  const cleanSummary = (summary) =>{
    if (!summary) return "N/A";
    let newSummary = summary;
    newSummary = removeTags("<p>", newSummary)
    newSummary = removeTags("<b>", newSummary)
    newSummary = removeTags("<i>", newSummary)
    return newSummary
  }

  const fixTime = (time) => {
    if (!time) return "Unknown"
    const colonIndex = time.indexOf(":")
    const hour = time.slice(0, colonIndex)
    if (hour === 24 || hour <= 11){
      return time + "am"
    } else {
      let updatedHour = hour;
      if (time !== 12){
        updatedHour = time.slice(0, 2) - 12
      }
      const hourlessTime = time.slice(colonIndex)

      return updatedHour + hourlessTime + "pm"
    }
  }

  const combinedArrayStrings = (array) => {
    if (!array || array.length === 0) return "None Found"
    return array.join(", ")
  }

  const updateFavorites = (e) => {
    const showID = e.target.id;
    const button = document.getElementById(showID)
    // const parentDiv = button.closest(".result")
    dispatch(updateFavoritedShows(showID))
    button.classList.toggle("favorited")
  }

  return (
    <div className="results-container">
      {((searchLoading && !toggleFavoriteShows) || (favoritesLoading && toggleFavoriteShows)) && <h1>Loading Shows</h1>}
      {(searchError || favoritesError) && <h1>Error. Couldn't load shows...</h1>}
      {(showData.length === 0 && !toggleFavoriteShows) && <h1>No Shows Found</h1>}
      {(showData.length === 0 && toggleFavoriteShows) && <h1>No Favorited Shows (yet!)</h1>}
      {showData.map((showData, index) => {
        console.log("Is Favorited: " + showData["isFavorited"])
        return (
          <div className="result" key={index}>
        <div className="box1">
          <button className={showData["isFavorited"] ? "favorite-button favorited" : "favorite-button"} id={showData["showID"]} onClick={(e) => updateFavorites(e)}>⭐</button>
          <img alt="Show Cover" loading="lazy" src={showData["coverPhoto"] || "https://picsum.photos/200"}></img>
        </div>
        <div className="box2">
          <h1 className="showTitle">{showData["showTitle"]}</h1>
          <p className="showScore"><b>Type: </b>{showData["type"]}</p>
          <p className="showRating"><b>Rating: </b>{showData["rating"]}/10</p>
          <p className="showScore"><b>Score: </b>{showData["showScore"]}</p>
          <p className="startDate"><b>Premiered: </b>{fixDate(showData["startDate"])}</p>
          <p className="endDate"><b>Ended: </b>{fixDate(showData["endDate"])}</p>
          <p className="status"><b>Status: </b>{showData["showStatus"]}</p>
        </div>
        <div className="box3">
          <details className="details">
            <summary className="summary">Show Summary</summary>
            <p>{cleanSummary(showData["summary"])}</p>
            </details>
          <p className="averageRuntime">Average Runtime: {showData["averageRuntime"]} minutes</p>
          <p className="genres">Genres: {combinedArrayStrings(showData["genres"])}</p>
          <p className="language">Language: {showData["language"]}</p>
          <p className="scheduleDays">Scheduled Days: {combinedArrayStrings(showData["scheduleDays"])}</p>
          <p className="scheduleTime">Scheduled Time: {fixTime(showData["scheduleTime"])}</p>
        </div>
      </div>
        )
  })}</div>)}