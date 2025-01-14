import Movies from "@/loader/sequelize/models/movie-model";
import Ratings from "@/loader/sequelize/models/ratings-model";
import Tags from "@/loader/sequelize/models/tags-model";
import Links from "@/loader/sequelize/models/links-model";

/**
 * Syncs specific Sequelize models.
 * @param force - If true, forces the table to drop and recreate.
 */
export async function syncModels(force: boolean = false) {
  try {
    console.log("Starting synchronization process...");

    // Sync each model individually
    // await Movies.sync({ force });
    // console.log("Movies table synchronized successfully");

    await Ratings.sync({ force });
    console.log("Ratings table synchronized successfully");

    // await Tags.sync({ force });
    // console.log("Tags table synchronized successfully");

    await Links.sync({ force });
    console.log("Links table synchronized successfully");

    console.log("Selected models synchronized successfully!");
  } catch (error) {
    console.error("Error during synchronization:", error);
  }
}
