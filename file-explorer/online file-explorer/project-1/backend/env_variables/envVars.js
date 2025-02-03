import dotenvFlow from "dotenv-flow";

dotenvFlow.config({
  path: "./env_variables",
});

const ENV_VARS = {
  PORT: process.env.PORT,
};

export default ENV_VARS;
