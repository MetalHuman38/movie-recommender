import { Sequelize } from "sequelize";
import fs from "fs";
import dbenv from "../env/dbenv";
import * as pg from 'pg';

// ** Database Configuration ** //
interface DBConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: "postgres";
  dialectModule: typeof pg;
}

// ** Database Connection ** //
const postgresConfig: DBConfig = {
  database: dbenv.DB_NAME,
  username: dbenv.DB_USER,
  password: dbenv.DB_PASS,
  host: dbenv.DB_HOST,
  port: dbenv.DB_PORT,
  dialect: "postgres",
  dialectModule: pg,
};

export function sequelizeConInstance(): Sequelize {
  const sequelize = new Sequelize(
    postgresConfig.database,
    postgresConfig.username,
    postgresConfig.password,
    {
      host: postgresConfig.host,
      port: postgresConfig.port,
      dialect: postgresConfig.dialect,
      dialectModule: postgresConfig.dialectModule,
    }
  );
  return sequelize;
}
