"use client";

import "./globals.css";
import store from "./redux/store";
import { Provider, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Page from "./navbar/page";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
   const pathname = usePathname();
   const noNavbarRoutes = ["/login", "/register-page", "/otp-screen"];

   return (
      <html lang="en">
         <body>
            <Provider store={store}>
               <QueryClientProvider client={queryClient}>
                  {!noNavbarRoutes.includes(pathname) && <Page />}
                  {children}
                  <ToastContainer />
               </QueryClientProvider>
            </Provider>
         </body>
      </html>
   );
}
