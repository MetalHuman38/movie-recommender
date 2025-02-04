import { useState, useEffect } from "react";
import axiosInstance from "@/axiosConfig";

export const useSearchMovies = (query: string) => {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!query) {
      setSearchResults(null);
      return;
    }

    const search = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get("/api/search", {
          params: { query },
        });
        console.log("✅ Search API Response:", response.data);
        setSearchResults(response.data.movies);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    search();
  }, [query]);

  return { searchResults, isLoading, error };
};
