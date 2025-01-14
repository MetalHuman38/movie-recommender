import { strict as assert } from "assert";
import dotenv from "dotenv";
import { load } from "ts-dotenv";

// ** Load the .env file into process.env ** //
dotenv.config();

const jwtenv = load({
  JWT_SECRET: String,
  JWT_EXPIRES_IN: Number,
  JWT_ALGORITHM: String,
  JWT_ISSUER: String,
  JWT_LOGIN_EXPIRES_IN: Number,
  JWT_COOKIE_NAME: String,
  JWT_COOKIE_EXPIRES_IN: String,
  JWT_COOKIE_SECURE: Boolean,
  JWT_COOKIE_HTTP_ONLY: Boolean,
  JWT_MAX_AGE: Number,
  JWT_REFRESH_SECRET: String,
  JWT_REFRESH_EXPIRES_IN: Number,
  JWT_REFRESH_ALGORITHM: String,
  JWT_REFRESH_ISSUER: String,
  JWT_REFRESH_MAX_AGE: Number,
  JWT_REFRESH_COOKIE_EXPIRES_IN: String,
  JWT_REFRESH_COOKIE_SECURE: Boolean,
  JWT_REFRESH_COOKIE_HTTP_ONLY: Boolean,
  JWT_SIGN_OPTIONS: String,
});

// ** Assert that the environment variables are defined ** //
assert(jwtenv.JWT_SECRET, "JWT User Secret is required");
assert(jwtenv.JWT_EXPIRES_IN, "JWT User Expires In is required");
assert(jwtenv.JWT_ALGORITHM, "JWT User Algorithm is required");
assert(jwtenv.JWT_ISSUER, "JWT User Issuer is required");
assert(jwtenv.JWT_LOGIN_EXPIRES_IN, "JWT Login Max Age is required");
assert(jwtenv.JWT_COOKIE_NAME, "JWT Cookie Name is required");
assert(jwtenv.JWT_COOKIE_EXPIRES_IN, "JWT Cookie Expires In is required");
assert(jwtenv.JWT_COOKIE_SECURE, "JWT Cookie Secure is required");
assert(jwtenv.JWT_COOKIE_HTTP_ONLY, "JWT Cookie HTTP Only is required");
assert(jwtenv.JWT_MAX_AGE, "JWT User Max Age is required");
assert(jwtenv.JWT_REFRESH_SECRET, "JWT User Refresh Secret is required");
assert(
  jwtenv.JWT_REFRESH_EXPIRES_IN,
  "JWT User Refresh Expires In is required"
);
assert(
  jwtenv.JWT_REFRESH_ALGORITHM,
  "JWT User Refresh Algorithm is required"
);
assert(jwtenv.JWT_REFRESH_ISSUER, "JWT User Refresh Issuer is required");
assert(jwtenv.JWT_REFRESH_MAX_AGE, "JWT User Refresh Max Age is required");
assert(
  jwtenv.JWT_REFRESH_COOKIE_EXPIRES_IN,
  "JWT User Refresh Cookie Expires In is required"
);
assert(
  jwtenv.JWT_REFRESH_COOKIE_SECURE,
  "JWT User Refresh Cookie Secure is required"
);
assert(
  jwtenv.JWT_REFRESH_COOKIE_HTTP_ONLY,
  "JWT User Refresh Cookie HTTP Only is required"
);
assert(jwtenv.JWT_SIGN_OPTIONS, "JWT Sign Options is required");

const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_ALGORITHM,
  JWT_ISSUER,
  JWT_LOGIN_EXPIRES_IN,
  JWT_COOKIE_NAME,
  JWT_COOKIE_EXPIRES_IN,
  JWT_COOKIE_SECURE,
  JWT_COOKIE_HTTP_ONLY,
  JWT_MAX_AGE,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_ALGORITHM,
  JWT_REFRESH_ISSUER,
  JWT_REFRESH_MAX_AGE,
  JWT_REFRESH_COOKIE_EXPIRES_IN,
  JWT_REFRESH_COOKIE_SECURE,
  JWT_REFRESH_COOKIE_HTTP_ONLY,
  JWT_SIGN_OPTIONS,
} = jwtenv;

export default {
  jwtenv,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_ALGORITHM,
  JWT_ISSUER,
  JWT_LOGIN_EXPIRES_IN,
  JWT_COOKIE_NAME,
  JWT_COOKIE_EXPIRES_IN,
  JWT_COOKIE_SECURE,
  JWT_COOKIE_HTTP_ONLY,
  JWT_MAX_AGE,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_ALGORITHM,
  JWT_REFRESH_ISSUER,
  JWT_REFRESH_MAX_AGE,
  JWT_REFRESH_COOKIE_EXPIRES_IN,
  JWT_REFRESH_COOKIE_SECURE,
  JWT_REFRESH_COOKIE_HTTP_ONLY,
  JWT_SIGN_OPTIONS,
};
