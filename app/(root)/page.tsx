import React from "react";
import MovieList from "@/components/MovieList";
import RandomMovies from "@/components/RandomMovies";
import ChatBot from "@/components/ChatBot";

const Home = async () => {
  return (
    <>
      <RandomMovies />
      <MovieList />
      <ChatBot />
    </>
  );
};

export default Home;
