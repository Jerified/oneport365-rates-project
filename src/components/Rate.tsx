"use client"

import { useState, useEffect } from "react";
import axios from 'axios'
import RateCard from './RateCard'

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
    const [size, setsize] = useState('20FT')
    const [type, setType] = useState('dry')
    // const [selectedOption, setSelectedOption] = useState<OptionType>(options[0]);

    const handleSelectsize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setsize(e.target.value)
        callAPI(size, type)
    }

    const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value)
        callAPI(size, type)
    }

    const callAPI = async (size: string, type: string) => {
        const { data } = await axios.post('/api/Rates', { size, type })
        console.log(data)
    }

    return (
        <section className='flex flex-col gap-8'>
            <div className=" flex gap-8">
                <select onChange={handleSelectsize} className="select select-bordered w-full bg-white outline-none border-non rounded-md">
                    {option1.map((option, index) => (
                        <option
                            key={index}
                            className=""
                        >
                            <p className="text-black">{option.value}</p>
                        </option>
                    ))}
                </select>
                <select onChange={handleSelectType} className="select select-bordered w-full bg-white outline-0 border-non rounded-md">
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

            {/* <RateCard /> */}
        </section>
    );
};

export default Rate;