import { UnauthorizedError } from "@application/errors";
import { UserRepository } from "@application/repositories/users";
import { LoginUserInput } from "@application/requests/auth";
import { PasswordHasher } from "@application/services/PasswordHasher";

export class LoginUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: LoginUserInput): Promise<{ user: {
    id: string;
    lastname: string;
    firstname: string;
    email: string;
  } }> {
    const email = input.email.toLowerCase();

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await this.passwordHasher.compare(
      input.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    return {
      user: {
        id: user.id,
        lastname: user.lastname,
        firstname: user.firstname,
        email: user.email,
      }
    };
  }
}
