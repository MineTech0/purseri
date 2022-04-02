import type { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends JWT {
    user: {
      id: string
    }
  }
}
declare module "next-auth" {

  interface Session extends Session {
    user: {
      id:string
    }
  }
}