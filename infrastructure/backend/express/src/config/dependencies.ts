
import { RegisterUser } from "@application/usecases/users/registerUser";
import { LoginUser } from "@application/usecases/users/loginUser";
import { createHttpRouter } from "../routes";
import { UserHttpHandler } from "../http/UserHttpHandler";
import { UserController } from "@express/controllers/UserController";
import { userRepository } from "./repositories";
import { passwordHasher, uuidGenerator } from "./services";

const registerUser = new RegisterUser(
  userRepository,
  passwordHasher,
  uuidGenerator,
);
const loginUser = new LoginUser(
  userRepository,
  passwordHasher,
);


const userController = new UserController(
  registerUser,
  loginUser,
  
);
const userHttpHandler = new UserHttpHandler(userController);



export const httpRouter = createHttpRouter(
  userHttpHandler,
  
);


