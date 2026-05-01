import { RegisterUser } from "@application/usecases/users/registerUser";

import { LoginUser } from "@application/usecases/users/loginUser";

import { RegisterUserInput, LoginUserInput } from "@application/requests/auth";

export class UserController {
  public constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginUser: LoginUser,
    
  ) {}

  public async register(
    payload: RegisterUserInput
  ): Promise<{ userId: string }> {
    return await this.registerUser.execute(payload);
  }



  public async login(
    payload: LoginUserInput
  ): Promise<{ user: {
    id: string;
    lastname: string;
    firstname: string;
    email: string;
  }}> {
    return this.loginUser.execute(payload);
  }

 
}
