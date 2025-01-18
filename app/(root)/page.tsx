import MovieOverview from "@/components/MovieOverview";
import MovieList from "@/components/MovieList";
import { db } from "@/database/drizzle";
import { registrations } from "@/database/schema";

const Home = async () => {
  const result = await db.select().from(registrations);
  console.log(JSON.stringify(result, null, 2));
  return (
    <>
      <MovieOverview />
      <MovieList />
    </>
  );
};

export default Home;
