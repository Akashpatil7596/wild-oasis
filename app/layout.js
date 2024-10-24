"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
   weight: ["400", "700"],
   style: ["normal", "italic"],
   subsets: ["latin"],
   display: "swap",
   variable: "--font-roboto",
});

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={`${roboto.className} flex font-rbt justify-center items-center h-screen`}>
            <Provider store={store}>
               {children}
               <ToastContainer />
            </Provider>
         </body>
      </html>
   );
}
