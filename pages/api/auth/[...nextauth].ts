import { TypeORMLegacyAdapter } from '@next-auth/typeorm-legacy-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  adapter: TypeORMLegacyAdapter({
    type: 'postgres',
    host: process.env.TYPEORM_HOST as string,
    port: parseInt(process.env.TYPEORM_PORT as string),
    username: process.env.TYPEORM_USERNAME as string,
    password: process.env.TYPEORM_PASSWORD as string,
    database: process.env.TYPEORM_DATABASE as string,
    synchronize: true,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user = token.user
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name ?? null
        }
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
})
