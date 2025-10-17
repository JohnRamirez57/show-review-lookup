
import axios from "axios";
import { useState } from "react";

const APILink = "https://api.tvmaze.com/search/shows?q=";

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