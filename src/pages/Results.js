import { useEffect, useState } from "react";
import { CleanShowData } from "../components/CleanShowData";
import { useSearchShows } from "../components/GetShows"
import { useSelector } from "react-redux";


export const Results = () => {
  const {shows, isLoading, isError, searchShows} = useSearchShows();
  const [returnedCleanedData, setReturnedCleanedData] = useState([])
  const currentSearch = useSelector((state) => state.shows.value.query) || ""

  useEffect(() =>{
    setReturnedCleanedData([])
    searchShows(currentSearch);
  }, [currentSearch])

  useEffect(() => { //this'll update shows once they finally load
    if (shows && shows.length > 0) {
      const cleanedData = CleanShowData(shows);
      setReturnedCleanedData(cleanedData);
      console.log("Shows fetched:", shows.length);
      console.log("Cleaned shows:", cleanedData.length);
    }
  }, [shows]);

  const fixDate = (showDate) =>{
    if (!showDate) return "N/A"
    const dashIndex = showDate.indexOf('-');
    const showYear = showDate.slice(0, dashIndex)
    const yearlessShowDate = showDate.slice(dashIndex + 1)
    return yearlessShowDate + "-" + showYear
  }

  const cleanSummary = (summary) =>{
    if (!summary) return "N/A";
    let newSummary = summary;
    do {
      newSummary = newSummary.replace("<p>", "")
    } while (newSummary.includes("<p>"));
    do {
      newSummary = newSummary.replace("</p>", "")
    } while (newSummary.includes("</p>"));
    do {
      newSummary = newSummary.replace("<b>", "")
    } while (newSummary.includes("<b>"));
    do {
      newSummary = newSummary.replace("</b>", "")
    } while (newSummary.includes("</b>"));
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

  

  return (
    <div className="results-container">
      {isLoading && <h1>Loading Shows</h1>}
      {isError && <h1>Error. Couldn't load shows...</h1>}
      {shows.length === 0 && <h1>No Shows Found</h1>}
      {returnedCleanedData.map((showData, index) => {
        // if (!showData) {
        //   console.warn(`Skipping show at index ${index}:`, showData);
        //   return null;
        // }
        return (
          <div className="result" key={index}>
        <div className="box1">
          <img alt="Show Cover" loading="lazy" src={showData["coverPhoto"] || "https://picsum.photos/200"}></img>
        </div>
        <div className="box2">
          <h1 className="showTitle">{showData["showTitle"]}</h1>
          <p className="showScore"><b>Type: </b>{showData["type"]}</p>
          <p className="showRating"><b>Rating: </b>{showData["rating"]}/10</p>
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