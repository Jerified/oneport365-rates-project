"use client"

import { useState, useEffect, Suspense } from "react";
import axios from 'axios'
import CarrierName from './CarrierName'
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

export type OptionType = {
    value: string;
};

const option1: OptionType[] = [
    { value: "20FT" },
    { value: "40FT" },
    { value: "40FT HC" },
];

const option2: OptionType[] = [
    { value: "dry" },
    { value: "reefer" },
];
const Rate = () => {
    const [options, setOptions] = useState({size: option1[0].value, type: option2[0].value})

    const handleSelectsize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOptions({...options, size:e.target.value})
        retrieveRate(e.target.value,options.type) 
    }

    const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOptions({...options, type:e.target.value})
        retrieveRate(options.size,e.target.value) 
    }

    useEffect(() => {
        retrieveRate(options.size, options.type)
      }, [options])
      

    const retrieveRate = async (size: string, type: string) => {
        const res = await axios.get(`https://test-api.oneport365.com/api/live_rates/get_special_rates_no_auth?container_size=${size}&container_type=${type}`)
        return res.data.data.rates
    }

    const { data: results, error, isLoading } = useQuery({
        queryKey: ["rates"],
        queryFn: () => retrieveRate(options.size, options.type)
    })

    if(isLoading) return <div className='loading loading-spinner text-success flex justify-center items-center mx-auto w-10'></div>

    if(error) return <div className="text-white">{toast.error(error.message)}</div>

    return (
        <section className='fle flex-col gap-8'>
            <div className=" flex gap-8">
                <select onChange={handleSelectsize} className="select select-bordered w-fit bg-white outline-none border-non rounded-md">
                    {option1.map((option, index) => (
                        <option
                            key={index}
                            className=""
                        >
                            <p className="text-black">{option.value}</p>
                        </option>
                    ))}
                </select>
                <select onChange={handleSelectType} className="select select-bordered w-fit bg-white outline-0 border-non rounded-md uppercase">
                    {option2.map((option, index) => (
                        <option
                            key={index}
                            className=""
                        >
                            <p className="text-black">{option.value}</p>
                        </option>
                    ))}
                </select>


            </div>
            <div className="pt-4">
                    <CarrierName results={results}/>
            </div>
        </section>
    );
};

export default Rate;