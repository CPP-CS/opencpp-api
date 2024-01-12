type EnvVars = {
  database: {
    testDatabaseName: string;
    databaseName: string;
    userName: string;
    password: string;
    host: string;
  };
  currentTerm: string;
  test: boolean;
};

export default () =>
  ({
    database: {
      testDatabaseName: process.env.DB_TEST_DB_NAME,
      databaseName: process.env.DB_DB_NAME,
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
    },
    currentTerm: process.env.CURRENT_TERM,
    test: process.env.ENV === 'test',
  }) as EnvVars;
