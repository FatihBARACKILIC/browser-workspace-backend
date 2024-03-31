export const envConfig = () => {
  return {
    post: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    mongodbUrl: process.env.MONGODB_URL,
  };
};
