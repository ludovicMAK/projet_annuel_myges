import { Pool } from "pg";

import { User } from "@domain/entities/users";
import { InfrastructureError } from "@application/errors";
import { ensureError, ErrorLike } from "@application/utils/errors";
import { UserRepository } from "@application/repositories/users";
import { UserRow } from "../types/UserRow";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly pool: Pool) {}

  async save(user: User): Promise<void> {
    try {
      await this.pool.query(
        `
          INSERT INTO users (id, lastname, firstname, email,  password)
          VALUES ($1, $2, $3, $4, $5)
        `,
        [
          user.id,
          user.lastname,
          user.firstname,
          user.email.toLowerCase(),
          user.password,
        ]
      );
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

 
  async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.pool.query<UserRow>(
        `
          SELECT id, lastname, firstname, email, password
          FROM users
          WHERE email = $1
          LIMIT 1
        `,
        [email.toLowerCase()]
      );

      if (result.rowCount === 0) {
        return null;
      }

      return this.mapRowToUser(result.rows[0]);
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  

  private mapRowToUser(row: UserRow): User {
    return new User(
      row.id,
      row.lastname,
      row.firstname,
      row.email,
      row.password,
    );
  }

  private handleDatabaseError(unknownError: ErrorLike): never {
    const error = ensureError(unknownError, "Unexpected database error");
    console.error("Database operation failed", error);
    throw new InfrastructureError(
      "Database unavailable. Please try again later."
    );
  }
}
