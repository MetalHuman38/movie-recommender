import { strict as assert } from "assert";
import dotenv from "dotenv";
import { load } from "ts-dotenv";

// Load the .env file
dotenv.config();

// ** Load Auth secrets ** //
const authenv = load({
  AUTH_SECRET: String,
});

// ** Validate the Auth secrets ** //
assert(authenv.AUTH_SECRET, "AUTH_SECRET is required");

const { AUTH_SECRET } = authenv;

export default {
  authenv,
  AUTH_SECRET,
};
