import { Sequelize } from "sequelize";
import { sequelizeConInstance } from "./postgresCon";

// ** Database Connection ** //
export async function waitForDBConnection(): Promise<Sequelize> {
  const sequelize = sequelizeConInstance();
  const delay = 5000; // 5 seconds
  const maxRetries = 10;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: false });
      console.log("PostgreSQL connection has been established successfully.");
      return sequelize;
    } catch (error) {
      console.error("Unable to connect to PostgreSQL database:", error);
      retries++;
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  throw new Error("Unable to connect to PostgreSQL database after multiple retries.");
}
