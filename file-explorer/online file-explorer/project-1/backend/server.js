import express from "express";
import https from "https";
import fs from "fs";
import ENV_VARS from "./env_variables/envVars.js";

const app = express();

const option = {
  cert: fs.readFileSync("./certificate/localhost.crt"),
  key: fs.readFileSync("./certificate/localhost.key"),
};

app.use((req, res) => {
  res.send("server is working");
});

const server = https.createServer(option, app);

server.listen(ENV_VARS.PORT, () => {
  console.log("server started https://localhost:443");
});
