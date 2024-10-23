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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "./registerPage.slice";

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    const [cityId, setCityId] = useState(0);

    const dispatch = useDispatch();

    const { data } = useSelector((state) => state.accountSlice);

    console.log("Data", data);

    function onSubmit(formData) {
        if (countryid && stateid && cityId) {
            console.log("formData", formData);
            console.log(countryid, stateid);

            GetCountries().then((data) =>
                formData["country"] = data?.find((e) => e?.id === countryid)
            );

            GetState(countryid).then((data) =>
                formData["state"] = data?.find((e) => e?.id === stateid)
            );

            GetCity(countryid, stateid).then((data) =>
                formData["city"] = data?.find((e) => e?.id === cityId)
            );

            dispatch(registerAsync(formData));
        }
    }

    return (
        <form
            className="w-full max-w-lg"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                    >
                        First Name
                    </label>
                    <input
                        {...register("firstName", { required: true })}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-first-name"
                        type="text"
                        placeholder="Jane"
                    />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                    >
                        Last Name
                    </label>
                    <input
                        {...register("lastName", { required: true })}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="text"
                        placeholder="Doe"
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
            <button className="appearance-none block w-full bg-red-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-8">
                Submit
            </button>
        </form>
    );
}
