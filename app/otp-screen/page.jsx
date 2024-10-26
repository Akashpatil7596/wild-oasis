"use client";

import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import "./style.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpAsync } from "./otpScreen.slice";
import Cookies from "js-cookie";

export default function Page() {
   const [otp, setOtp] = useState("");

   const dispatch = useDispatch();

   const router = useRouter();

   const { success } = useSelector((state) => state.otpScreenSlice);

   useEffect(() => {
      if (otp?.length === 4) {
         const email = Cookies.get("email");

         dispatch(verifyOtpAsync({ email, otp }));
      }
   }, [otp]);

   useEffect(() => {
      if (success) {
         Cookies.remove("email");

         router.push("/login");
      }
   }, [success]);

   return (
      <>
         <div className="flex font-rbt justify-center items-center h-screen">
            <div className="otp-box">
               <h1>Dial Your OTP Here 🤖</h1>
               <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  // renderSeparator={<span> - </span>}
                  isInputNum={true}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                     border: "2px solid grey",
                     borderRadius: "8px",
                     width: "54px",
                     height: "54px",
                     fontSize: "12px",
                     color: "#000",
                     fontWeight: "400",
                     caretColor: "blue",
                     margin: "0 10px",
                  }}
               />
            </div>
         </div>
      </>
   );
}
