import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter"
import NextAuth from "next-auth"
import { ConnectionOptions, getConnectionOptions } from "typeorm"
import GoogleProvider from "next-auth/providers/google";
import options from "../../../ormconfig";

export default NextAuth({
adapter: TypeORMLegacyAdapter(options),
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
  ],
  secret: 'secret'
})