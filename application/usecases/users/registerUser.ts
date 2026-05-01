import { ConflictError, ValidationError } from "@application/errors";
import { UserRepository } from "@application/repositories/users";
import { RegisterUserInput } from "@application/requests/auth";
import { PasswordHasher } from "@application/services/PasswordHasher";
import { UuidGenerator } from "@application/services/UuidGenerator";
import { User } from "@domain/entities/users";


export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly uuidGenerator: UuidGenerator,
  ) {}

  async execute(input: RegisterUserInput): Promise<{ userId: string }> {
    const normalizedEmail = input.email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      throw new ValidationError("Invalid email format");
    }

    if (!input.password || input.password.length < 8) {
      throw new ValidationError("Password too short");
    }

    const existingUser = await this.userRepository.findByEmail(normalizedEmail);
    if (existingUser) {
      
      
      throw new ConflictError("Email already registered");
    }

    const passwordHash = await this.passwordHasher.hash(input.password);
    const userId = this.uuidGenerator.generate();

    const user = new User(
      userId,
      input.lastname.trim(),
      input.firstname.trim(),
      normalizedEmail,
      passwordHash,
    );

    await this.userRepository.save(user);


    return { userId };
  }
}
