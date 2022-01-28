import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import allEntities from "../../../lib/db/allEntities";
import * as entities from "../../../lib/db/entity/entities"

export default NextAuth({
adapter: TypeORMLegacyAdapter({
  type: "postgres",
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string),
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  entities:allEntities,
  synchronize: true,
}, {entities}),
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
  ],
  secret: 'secret'
})

