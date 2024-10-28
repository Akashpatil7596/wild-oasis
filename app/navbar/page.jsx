"use client";

import Link from "next/link";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setLoading } from "./slice";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Page() {
   const [userProfile, setUserProfile] = useState(null);

   useEffect(() => {
      const { userProfile } = secureLocalStorage?.getItem("user");
      setUserProfile(userProfile);
   }, []);

   return (
      <>
         <div className="pencil-banner text-white">
            <ul className="nav-ul">
               <li className="nav-li">
                  <div className="left-section">
                     <img style={{ maxWidth: "120px" }} src="/airbnb.svg" alt="airbnb" />
                  </div>
               </li>
               <li className="nav-li">
                  <div className="middle-section flex justify-evenly">
                     <Link href={"/"}>about</Link>
                     <Link href={"/"}>contact us</Link>
                  </div>
               </li>
               <li className="nav-li">
                  <div className="right-section flex justify-end items-center	">
                     <img
                        className="w-8 h-8 rounded-full"
                        src={`https://nestjs-my-bucket.s3.ap-south-1.amazonaws.com/${userProfile}`}
                        alt="vikings"
                     />
                  </div>
               </li>
            </ul>
         </div>
      </>
   );
}
