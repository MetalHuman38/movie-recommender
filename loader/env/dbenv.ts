import { strict as assert } from "assert";
import dotenv from "dotenv";
import { load } from "ts-dotenv";

// Load the .env file
dotenv.config();

// ** Load database environment variables ** //
const dbenv = load({
  DB_NAME: String,
  DB_USER: String,
  DB_PASS: String,
  DB_PORT: Number,
  DB_HOST: String,
  DB_SSL_CA: String,
  DB_SSL_KEY: String,
  DB_SSL_CERT: String,
});

// ** Validate the database environment variables ** //
assert(dbenv.DB_NAME, "DB_NAME is required");
assert(dbenv.DB_USER, "DB_USER is required");
assert(dbenv.DB_PASS, "DB_PASS is required");
assert(dbenv.DB_PORT, "DB_PORT is required");
assert(dbenv.DB_HOST, "DB_HOST is required");
assert(dbenv.DB_SSL_CA, "DB_SSL_CA is required");
assert(dbenv.DB_SSL_KEY, "DB_SSL_KEY is required");
assert(dbenv.DB_SSL_CERT, "DB_SSL_CERT is required");

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DB_HOST,
  DB_SSL_CA,
  DB_SSL_KEY,
  DB_SSL_CERT,
} = dbenv;

export default {
  dbenv,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DB_HOST,
  DB_SSL_CA,
  DB_SSL_KEY,
  DB_SSL_CERT,
};