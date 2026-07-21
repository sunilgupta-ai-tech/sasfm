import { app } from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`SASFM backend listening on http://localhost:${env.port}`);
  console.log(`Health check: http://localhost:${env.port}/health`);
});
