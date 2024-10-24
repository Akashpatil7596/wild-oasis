"use client";

import {
   CitySelect,
   CountrySelect,
   GetCity,
   GetCountries,
   GetState,
   StateSelect,
} from "react-country-state-city";
import { useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "./registerPage.slice";
import { toaster } from "../toaster/toasterSlice";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import "./style.css";
import Cookies from "js-cookie";

export default function Page() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   const [countryid, setCountryid] = useState(0);
   const [stateid, setstateid] = useState(0);
   const [cityId, setCityId] = useState(0);

   const router = useRouter();

   const dispatch = useDispatch();

   const { data } = useSelector((state) => state.accountSlice);

   const { error } = useSelector((state) => state.accountSlice);

   useEffect(() => {
      dispatch(toaster(false, error));
      reset();
      setCountryid(0);
      setstateid(0);
      setCityId(0);
   }, [error]);

   useEffect(() => {
      if (data?.length) {
         dispatch(toaster(true, "Registration Succesfull"));
         reset();
         setCountryid(0);
         setstateid(0);
         setCityId(0);

         Cookies.set("email", data[0]?.email, { expires: 1 });
         router.push("/otp-screen");
      }
   }, [data]);

   async function onSubmit(formData) {
      if (countryid && stateid && cityId) {
         const countryArray = await GetCountries();

         formData["country"] = countryArray.find((e) => e?.id === countryid).name;

         const stateArray = await GetState(countryid);

         formData["state"] = stateArray?.find((e) => e?.id === stateid).name;

         const cityArray = await GetCity(countryid, stateid);

         formData["city"] = cityArray?.find((e) => e?.id === cityId).name;

         dispatch(registerAsync(formData));
      }
   }

   return (
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
               <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-username"
               >
                  Username
               </label>
               <input
                  {...register("userName", { required: true })}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-username"
                  type="text"
               />
            </div>
         </div>

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
                  placeholder="******************"
               />
               <p className="text-gray-600 text-xs italic">
                  Make it as long and as crazy as you&apos;d like
               </p>
            </div>
         </div>

         <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
               >
                  Country
               </label>
               <CountrySelect
                  onChange={(e) => {
                     setCountryid(e.id);
                  }}
                  placeHolder="Select Country"
               />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
               >
                  State
               </label>
               <StateSelect
                  countryid={countryid}
                  onChange={(e) => {
                     setstateid(e.id);
                  }}
                  placeHolder="Select State"
               />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-zip"
               >
                  City
               </label>
               <CitySelect
                  countryid={countryid}
                  stateid={stateid}
                  onChange={(e) => {
                     setCityId(e.id);
                  }}
                  placeHolder="Select City"
               />
            </div>
         </div>
         <button className="submit-btn appearance-none block w-full bg-red-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-8">
            Submit
         </button>
      </form>
   );
}
