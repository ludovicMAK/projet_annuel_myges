import { CryptoPasswordHasher } from "@adapters/services/CryptoPasswordHasher"
import { NodeUuidGenerator } from "@adapters/services/NodeUuidGenerator"
import { PasswordHasher } from "@application/services/PasswordHasher"
import { UuidGenerator } from "@application/services/UuidGenerator"





export const passwordHasher: PasswordHasher = new CryptoPasswordHasher()
export const uuidGenerator: UuidGenerator = new NodeUuidGenerator()


