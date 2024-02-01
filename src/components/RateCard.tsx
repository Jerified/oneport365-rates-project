"use client"

import {
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { OptionType } from "@/app/page";



const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const RateCard = ({ options }: { options: OptionType[] }) => {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<OptionType>(options[0]);




    return (
        <div className="p-8 pb-56 flex items-center justify-center bg-white ">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    onClick={() => setOpen((pv) => !pv)}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-indigo-50 text-lg uppercase bg-indigo-500 w-[8rem] hover:bg-indigo-500 transition-colors"
                >
                    <span className="font-medium text-sm">{selectedOption.value}</span>
                    <span>
                        <FiChevronDown />
                    </span>
                </button>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", translateX: "-50%" }}
                    className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
                >
                    {options.map((option, index) => (
                        <Option
                            key={index}
                            option={option}
                            setOpen={setOpen}
                            setSelectedOption={setSelectedOption}
                            selectedOption={selectedOption}
                        />
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    );
};

const Option = ({
    option,
    setOpen,
    selectedOption,
    setSelectedOption,
}: {
    option: OptionType;
    setOpen: (open: boolean) => void;
    setSelectedOption: (option: OptionType) => void;
    selectedOption: OptionType;
}) => {

    const [selectedOption1, setSelectedOption1] = useState<OptionType | null>(null);

    const handleChange = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
        setSelectedOption(option);
        console.log(selectedOption)

        callAPI(option)
    }

    const callAPI = async (option: OptionType) => {
        const response = await fetch('api/Rates', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({option})
        })
        console.log(option)
    }

    // useEffect(() => {
    //     // https://oneport365.free.beeceptor.com/live_rates?c  ontainer_size=20FT&container_type=dry

    // },[])

return (
    <li
        // onChange={handleChange}
        onClick={handleChange}
        className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
        <span>{option.value}</span>
    </li>
);
  };

export default RateCard;
