// Hook to fetch random data from Flask API
import { useFetchAPI } from "./use-fetch-api";

export const useFetchRand = () => {
  return useFetchAPI("/api/random", {
    top_n: 5,
  });
};

export default useFetchRand;
