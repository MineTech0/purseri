import { UserEntity } from "@next-auth/typeorm-legacy-adapter/dist/entities"
import NextAuth, { User } from "next-auth"

declare module "next-auth" {

  interface Session extends Session {
    user: User
  }
}