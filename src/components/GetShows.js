
import axios from "axios";
import { useState } from "react";

const APILink = "https://api.tvmaze.com/search/shows?q=";
const APIShowID = "https://api.tvmaze.com/shows/"

export const useSearchShows = () => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchShows = async (querySearch) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(APILink + querySearch);
      setShows(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching shows:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { shows, isLoading, error, searchShows };
};

export const useShowWithIDS = () => {
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchShowID = async (showIDs) => {
    setIsLoading(true);
    setError(null);
    setFavoriteShows([]); 

    try {
      const promises = showIDs.map(id => axios.get(APIShowID + id));
      const responses = await Promise.all(promises);
      const showsData = responses.map(response => response.data);
      setFavoriteShows(showsData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching shows: ", err);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log("Favorite Shows Data: " + favoriteShows)
  // for (const show in favoriteShows){
  //   console.log(favoriteShows[show])
  // }
  return { favoriteShows, isLoading, error, searchShowID };
};