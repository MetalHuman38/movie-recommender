import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import SearchResults from "./SearchResult";
import { useSearchMovies } from "@/hooks/useSearch";
import { useDebounce } from "@/hooks/use-debounce";

const SearchInput = () => {
  const [query, setQuery] = useState(""); // State to manage the search query
  const debouncedQuery = useDebounce(query, 500); // Debounce the query
  const {
    searchResults: movies,
    isLoading,
    error,
  } = useSearchMovies(debouncedQuery); // Fetch results using the debounced query

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Update the query state as the user types
  };

  return (
    <div className="relative">
      <Input
        id="search"
        type="text"
        placeholder="Search for movies"
        className="w-96 border-gray-300 border-2 rounded-lg p-2 text-white"
        value={query}
        onChange={handleInputChange}
      />

      {/* Display search results */}
      {query && (
        <div className="absolute mt-2 w-96 bg-dark-100 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading && <p className="p-4 text-white">Loading...</p>}
          {error && (
            <p className="p-4 text-white">
              An error occurred. Please try again.
            </p>
          )}
          {movies?.length > 0 ? (
            <SearchResults searchedMovies={movies} isSearching={true} />
          ) : (
            <p className="p-4 text-white">No results found in search Input.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
