import { Router } from "express";
import { UserHttpHandler } from "../http/UserHttpHandler";

export function createUserRoutes(userHttpHandler: UserHttpHandler): Router {
  const router = Router();

  router.post("/auth/signup", (request, response) =>
    userHttpHandler.register(request, response)
  );
 
  router.post("/auth/login", (request, response) =>
    userHttpHandler.login(request, response)
  );

  return router;
}
