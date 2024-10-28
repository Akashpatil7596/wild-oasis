import { NextResponse } from "next/server";

export function middleware(request) {
   const isEmail = request.cookies.get("email");

   const token = request.cookies.get("token");

   if (
      !token &&
      request.nextUrl.pathname !== "/login" &&
      request.nextUrl.pathname !== "/otp-screen" &&
      request.nextUrl.pathname !== "/register-page" &&
      !request.nextUrl.pathname.startsWith("/_next/")
   ) {
      return NextResponse.redirect(new URL("/login", request.url));
   }

   // if (
   //    !token &&
   //    request.nextUrl.pathname !== "/otp-screen" &&
   //    request.nextUrl.pathname !== "/register-page" &&
   //    request.nextUrl.pathname !== "/"
   // ) {
   //    return NextResponse.redirect(new URL("/login", request.url));
   // }

   if (request.nextUrl.pathname === "/otp-screen") {
      if (!isEmail) {
         return NextResponse.redirect(new URL("/register-page", request.url));
      }
   }

   if (request.nextUrl.pathname === "/dashboard") {
      if (!isEmail) {
         return NextResponse.redirect(new URL("/register-page", request.url));
      }
   }

   if (request.nextUrl.pathname === "/navbar") {
      if (!token) {
         return NextResponse.redirect(new URL("/login", request.url));
      }

      return NextResponse.redirect(new URL("/user-profile", request.url));
   }

   if (request.nextUrl.pathname === "/") {
      if (!token) {
         return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.redirect(new URL("/user-profile", request.url));
   }

   return NextResponse.next();
}
