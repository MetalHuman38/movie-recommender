import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema"; // Assuming coreMovies is your table
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const RedirectToMovie = async ({
  params,
}: {
  params: Promise<{ imdbId: string }>;
}) => {
  const imdbId = (await params)?.imdbId; // ✅ This is imdbId

  console.log("🔍 Looking up movieId for imdbId:", imdbId);

  // 🔹 Fetch `movieId` from `core_movies` using `imdbId`
  const result = await drizzledb
    .select({ movieId: coreMovie.movieId })
    .from(coreMovie)
    .where(eq(coreMovie.imdbId, Number(imdbId))) // Ensure imdbId is cast to a number
    .limit(1)
    .execute();

  console.log("🔍 Database Query Result:", result);

  if (!result || result.length === 0) {
    console.error("❌ No movieId found for imdbId:", imdbId);
    redirect("/404"); // Redirect to 404 if movie not found
  }

  const movieId = result[0].movieId;
  console.log("✅ Redirecting to /movies/", movieId);

  // 🔹 Redirect user to `/movies/{movieId}`
  redirect(`/movies/${movieId}`);
};

export default RedirectToMovie;
