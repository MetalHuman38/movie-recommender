// Fetches recommended Movies from content based model using Flask API
import { useFetchAPI } from "./use-fetch-api";

export const useFetchRec = () => {
  return useFetchAPI("/api/recommendations?movie_id=1&top_n=20");
};
