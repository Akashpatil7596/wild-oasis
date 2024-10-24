"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function Page() {
   const router = useRouter();
   useEffect(() => {
      router.push("/register-page");
   });

   return <ToastContainer />;
}
