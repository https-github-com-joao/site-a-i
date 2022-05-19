export const config = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  apiPrefix: process.env.API_PREFIX,
  appSecretKey: process.env.APP_SECRET ?? "o4Rlg4kxuDu5Gj3ta3DDd4fmvMG5d2tx_0Tfm7n_-bEbMVWUJUYmw1FTl8IP4lQN",
  cacheExpireIn: process.env.CACHE_EXPIRE_IN ? parseInt(process.env.CACHE_EXPIRE_IN) : 3600,

  database: {
    host: process.env.DB_HOST ?? "",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    user: process.env.DB_USER ?? "",
    password: process.env.DB_PASS ?? "",
    name: process.env.DB_NAME ?? "",
  },

  timezone: process.env.TIMEZONE || "America/Sao_Paulo",
};
