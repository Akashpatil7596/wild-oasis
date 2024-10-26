"use client";

import Link from "next/link";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setLoading } from "./slice";
import { useEffect, useState } from "react";

export default function Page() {
   const { isLoading, error, data } = useQuery({
      queryKey: ["users"],
      queryFn: () =>
         fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/${_id}`).then((res) => res.json()),
   });

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
                        src="https://images.pexels.com/photos/35797/carnival-mask-costume-panel.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="vikings"
                     />
                  </div>
               </li>
            </ul>
         </div>
      </>
   );
}
