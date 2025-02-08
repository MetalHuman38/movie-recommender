export const config = {
  env: {
    databaseUrl: process.env.DATABASE_URL || "",
    localDatabaseUrl: process.env.NEXT_PUBLIC_DB_URL || "",
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_REST_URL || "",
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN || "",
      qstashUrl: process.env.QSTASH_URL || "",
      qstashToken: process.env.QSTASH_TOKEN || "",
    },
  },
};

export default config;
