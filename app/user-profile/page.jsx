"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
   const [loading, setLoading] = useState(false);

   const user = JSON?.parse(localStorage?.getItem("user"));

   const { isLoading, error, data } = useQuery({
      queryKey: ["users"],
      queryFn: () =>
         fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/${user?._id}`).then((res) => res.json()),
   });

   useEffect(() => {
      setLoading(isLoading);
   }, [isLoading, data]);

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
