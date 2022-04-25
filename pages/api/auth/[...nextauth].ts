import { isAllowedToAccess } from './../../../lib/utils/index';
import { TypeORMLegacyAdapter } from '@next-auth/typeorm-legacy-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  adapter: TypeORMLegacyAdapter({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    synchronize: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
  }
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
    async signIn({ user }) {
      return isAllowedToAccess(user)
    }
  },
  session: {
    strategy: 'jwt',
  },
})
