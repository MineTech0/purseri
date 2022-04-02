import { NextApiRequest } from 'next';
import { getToken } from "next-auth/jwt"

export default async function middleware(req: NextApiRequest) {
    const token = await getToken({ req })
    if(!token) {
        return new Response('No access for u', { status: 401 })
    }
  }