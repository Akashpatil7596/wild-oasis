import { NextResponse } from "next/server";

export function middleware(request) {
   const isEmail = request.cookies.get("email");

   if (request.nextUrl.pathname === "/otp-screen") {
      if (!isEmail) {
         return NextResponse.redirect(new URL("/register-page", request.url)); // Redirect to home
      }
   }

   return NextResponse.next();
}
