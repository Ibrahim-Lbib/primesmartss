import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the request is for the admin panel
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // In a real application, you would check for authentication here
    // For now, we'll just allow access to demonstrate the admin panel
    // If you want to implement real authentication later:
    // const session = request.cookies.get("session")
    // if (!session) {
    //   return NextResponse.redirect(new URL("/login", request.url))
    // }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
}
