"use client";

import { useForm } from "react-hook-form";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { falseError, falseSuccess, loginAsync } from "./slice";
import { useEffect } from "react";
import { toaster } from "../toaster/toasterSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";

export default function Page() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   const router = useRouter();

   const dispatch = useDispatch();

   const { success } = useSelector((state) => state.loginSlice);
   const { successMessage } = useSelector((state) => state.loginSlice);

   const { error } = useSelector((state) => state.loginSlice);
   const { errorMessage } = useSelector((state) => state.loginSlice);

   const { data } = useSelector((state) => state.loginSlice);

   useEffect(() => {
      if (error) {
         dispatch(toaster(false, errorMessage));
         dispatch(falseError());
      }
   }, [error]);

   useEffect(() => {
      if (success) {
         secureLocalStorage.setItem("user", data);
         // localStorage.setItem("user", JSON.stringify(data));
         Cookies.set("token", data?.token);
         dispatch(toaster(true, successMessage));
         router.push("/user-profile");
         dispatch(falseSuccess());
      }
   }, [success]);

   function onSubmit(formData) {
      if (formData?.email && formData?.password) {
         dispatch(loginAsync(formData));
      }
   }

   return (
      <div className="relative h-screen font-rbt">
         {/* Top-right corner buttons */}
         <div className="absolute top-4 right-4 flex space-x-4">
            <Link className="bg-blue-500 text-white py-2 px-4 rounded" href={"/login"}>
               Login
            </Link>
            <Link className="bg-green-500 text-white py-2 px-4 rounded" href={"/register-page"}>
               Register
            </Link>
         </div>

         <div className="flex font-rbt justify-center items-center h-screen">
            <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
               <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                     <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-email"
                     >
                        Email
                     </label>
                     <input
                        {...register("email", { required: true })}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-email"
                        type="text"
                     />
                  </div>
               </div>

               <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                     <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                     >
                        Password
                     </label>
                     <input
                        {...register("password", { required: true })}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        type="password"
                     />
                  </div>
               </div>

               <button className="submit-btn appearance-none block w-full bg-red-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-4">
                  Submit
               </button>
            </form>
         </div>
      </div>
   );
}
