import { getToken } from "next-auth/jwt"
import { NextRequest } from 'next/server';

const allowedRoutes = [
    {
        uri: '/api/ships/[shipId]/records',
        method: 'POST'
    },
    {
        uri:'/api/ships/[shipId]/crew/exists',
        method: 'GET'
    }
]

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req })
    console.log(req.page)
    
    if(!token && !allowedRoute(req) ) {
        return new Response('No access for u', { status: 401 })
    }
  }
  const allowedRoute = (req:NextRequest) => {
    return allowedRoutes.some(route => route.uri === req.page.name && route.method === req.method )
  }
  