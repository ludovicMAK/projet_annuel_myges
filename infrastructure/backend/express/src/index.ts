import "dotenv/config";
import { createServer } from "http";
import { app } from "./server";
import { InfrastructureError } from "@application/errors";
import { ensureSchema } from "./db/migrate";
import { repositoryDriver } from "./config/repositories";


const port = process.env.BACKEND_PORT;
if (!port) {
  throw new InfrastructureError(
    "BACKEND_PORT required environment variable is missing"
  );
}

async function bootstrap() {
  try {
    if (repositoryDriver === "postgres") {
      await ensureSchema();
    }

    const httpServer = createServer(app);

    
    httpServer.listen(port, () => {
      process.stdout.write(`HTTP server listening on port ${port}\n`);
      process.stdout.write(`WebSocket server initialized\n`);
    });
  } catch {
    process.stderr.write(
      "Failed to start server due to database initialization error.\n"
    );
    process.exit(1);
  }
}

void bootstrap();
