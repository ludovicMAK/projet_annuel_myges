import { Router } from "express";
import { UserHttpHandler } from "../http/UserHttpHandler";
import { createUserRoutes } from "./userRoutes";



export function createHttpRouter(
  userHttpHandler: UserHttpHandler,
  
): Router {
  const router = Router();



  router.use(createUserRoutes(userHttpHandler));


  return router;
}
