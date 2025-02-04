import React from "react";
import MovieOverview from "@/components/MovieOverview";
import MovieList from "@/components/MovieList";
import TopPicksCard from "@/components/TopPicksCard";
import ChatBot from "@/components/ChatBot";

const Home = async () => {
  return (
    <>
      <TopPicksCard />
      <MovieList />
      <ChatBot />
    </>
  );
};

export default Home;
