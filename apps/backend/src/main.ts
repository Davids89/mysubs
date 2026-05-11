import { createApp } from "./infrastructure/http/create-app.js";

const DEFAULT_PORT = 3000;

const getPort = (): number => {
  const rawPort = process.env.PORT;
  return rawPort ? Number.parseInt(rawPort, 10) : DEFAULT_PORT;
};

const app = createApp();
const port = getPort();

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
