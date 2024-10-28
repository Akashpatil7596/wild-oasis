"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { fetchData } from "./userProfile.slice";
import { toaster } from "../toaster/toasterSlice";
import secureLocalStorage from "react-secure-storage";

export default function Page() {
   const [loading, setLoading] = useState(true);

   const router = useRouter();

   const dispatch = useDispatch();

   const { error, errorMessage, success, successMessage, data } = useSelector(
      (state) => state.userProfileSlice,
   );

   useEffect(() => {
      const { _id, token } = secureLocalStorage?.getItem("user");
      dispatch(fetchData({ id: _id, token }));
   }, []);

   useEffect(() => {
      if (error) {
         dispatch(toaster(false, errorMessage));

         router.push("/login");
      }

      if (success) {
         dispatch(toaster(true, successMessage));
         setLoading(false);
      }
   }, [error, success]);

   return (
      <>
         <div className={`${loading ? "loading" : ""}`}></div>
         <div className={`${loading ? "overlay" : ""}`}></div>
         <div>
            <img
               className="max-w-48"
               src={`https://nestjs-my-bucket.s3.ap-south-1.amazonaws.com/${data?.userProfile}`}
               alt=""
            />
            <h2>{data?.userName}</h2>
         </div>
      </>
   );
}
