import { Request, Response } from "express";

import { User } from "@domain/entities/users";
import { UserController } from "@express/controllers/UserController";
import { RegisterUserSchema } from "@express/schemas/RegisterUserSchema";
import { UserRegistrationResponseData } from "@express/types/responses";
import { ValidationError } from "@application/errors";
import { sendSuccess } from "../responses/success";
import { mapErrorToHttpResponse } from "../responses/error";
import { LoginUserSchema } from "@express/schemas/LoginUserSchema";

const isUuid = (value: string): boolean => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(value);
};

export class UserHttpHandler {
  constructor(
    private readonly controller: UserController,
  ) {}

  public async register(request: Request, response: Response) {
    try {
      const parsed = RegisterUserSchema.safeParse(request.body);
      if (!parsed.success) {
        const issues = parsed.error.issues
          .map((issue) => issue.message)
          .join(", ");
        throw new ValidationError(issues || "Invalid payload.");
      }

      const result = await this.controller.register(parsed.data);
      return sendSuccess<UserRegistrationResponseData>(response, {
        status: 201,
        code: "USER_REGISTERED",
        message: "inscription réussie.",
        data: { userId: result.userId },
      });
    } catch (error) {
      return mapErrorToHttpResponse(response, error);
    }
  }

  

  public async login(request: Request, response: Response) {
    try {
      const parsed = LoginUserSchema.safeParse(request.body);
      if (!parsed.success) {
        const issues = parsed.error.issues
          .map((issue) => issue.message)
          .join(", ");
        throw new ValidationError(issues || "Invalid payload.");
      }

      const { user } = await this.controller.login(parsed.data);
      return sendSuccess(response, {
        status: 200,
        code: "LOGIN_SUCCESS",
        message: "Login successful.",
        data: {
          user: user,
          token: null,
        },
      });
    } catch (error) {
      return mapErrorToHttpResponse(response, error);
    }
  }
  

  

  

 

  
}
