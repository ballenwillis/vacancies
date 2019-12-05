const express = require("express");
const { postgraphile } = require("postgraphile");
const app = express();
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");

require("dotenv").config();

app.use(
  postgraphile(process.env.DATABASE_URL, {
    graphiql: true,
    appendPlugins: [ConnectionFilterPlugin],
    jwtSecret: process.env.API_SECRET,
    pgDefaultRole: "vac_anonymous",
    jwtPgTypeIdentifier: "public.jwt_token",
    enableCors: true,
    ignoreRBAC: false
  })
);

app.listen({ port: process.env.PORT, host: process.env.HOST }, () =>
  console.log("Listening on port " + process.env.PORT)
);
