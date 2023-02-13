import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        return NextResponse.rewrite(req.url)
    },
    {
        callbacks: {
            authorized: ({ token }) => token !== null,
        },
    }
)

export const config = { matcher: ["/me", "/home", "/tasks"] }
