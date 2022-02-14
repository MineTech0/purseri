import { TypeORMLegacyAdapter } from '@next-auth/typeorm-legacy-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import allEntities from '../../../lib/db/allEntities'
import * as entities from '../../../lib/db/entity/entities'

export default NextAuth({
  adapter: TypeORMLegacyAdapter(
    {
      type: 'postgres',
      host: process.env.TYPEORM_HOST as string,
      port: parseInt(process.env.TYPEORM_PORT as string),
      username: process.env.TYPEORM_USERNAME as string,
      password: process.env.TYPEORM_PASSWORD as string,
      database: process.env.TYPEORM_DATABASE as string,
      entities: allEntities,
      synchronize: true,
    },
    { entities }
  ),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: 'secret',
  callbacks: {
    async session({ session, user }) {
      session.user = user
      return session
    },
  },
})
