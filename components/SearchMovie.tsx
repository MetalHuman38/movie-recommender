import React from "react";
import SearchForm from "@/components/SearchForm";
import { searchSchema } from "@/lib/validations";

const SearchMovie = () => {
  return (
    <div className="flex flex-col items-center">
      <SearchForm
        schema={searchSchema}
        defaultValues={{ query: "" }}
        onSubmit={(data) => {}}
        type="title"
      />
    </div>
  );
};

export default SearchMovie;
