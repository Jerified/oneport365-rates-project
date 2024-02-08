"use client"

import { useState } from "react";
import { Button } from '@/components/ui/button'
import RateCard from "@/components/RateCard";
import { FreightData } from "@/lib/types";

type carrierNameProps = {
    results: FreightData[]
}

const ITEMS_PER_PAGE = 9

const CarrierName = ({ results }: carrierNameProps) => {
    const [selected, setSelected] = useState(
        () => {
        const firstCarrier = results[0]?.carrier_name
        const firstRate = results.filter(d => d.carrier_name === firstCarrier)
        return firstRate.slice(0, ITEMS_PER_PAGE) }
        )
    const [selectedCarrier, setSelectedCarrier] = useState(
        () => {
            return results[0]?.carrier_name
        }
    )
    const [carrierLength, setCarrierLength] = useState(() => {
        const firstCarrier = results[0]?.carrier_name
        return results.filter(d => d.carrier_name === firstCarrier).length
    })
    const [showAll, setShowAll] = useState(false)
    const uniqueCarrierNames = new Set(results.map(d => d.carrier_name))
    const filterRate = (name: string) => {
        const rate = results.filter(d => d.carrier_name === name)
        setSelectedCarrier(name)
        setCarrierLength(rate.length)
        setSelected(rate.slice(0, ITEMS_PER_PAGE))
        setShowAll(false)
    }
    
    const handleToggle = () => {
        setShowAll(prev => !prev)
        if (showAll) {
            setSelected(results.slice(0, ITEMS_PER_PAGE));
        } else {
            setSelected(results.filter(d => d.carrier_name === selectedCarrier));
        }
    }
    
    return (
        <div className="overflow-hidden w-full">
            <div className="flex flex-row gap-4 overflow-x-scroll scrollbar w-full">
                {Array.from(uniqueCarrierNames).map((name, index) => (
                    <Button key={index} onClick={() => filterRate(name)}  className={`
                    ${selectedCarrier === name ? 'text-accent-foreground text-white' : 'bg-white text-black'}
                    text-lg px-4 py-6 font-normal border border-zinc-600  hover:text-white
                  `}>{name}</Button>
                ))}
            </div>
            <RateCard selected={selected} />
            {carrierLength > ITEMS_PER_PAGE && <div className='mx-auto flex flex-col gap-4 pt-5 '>
                <p className='text-center text-[0.9rem]'>Viewing {selected.length} of {carrierLength} special rates</p>
                <button onClick={handleToggle} className='w-fit mx-auto border-zinc-600 border bg-white text-black px-12 py-3 text-md rounded-md hover:bg-accent-foreground hover:text-white hover:transition-all hover:duration-150'>
                    {showAll ? "Show Less" : "Show All"}
                </button>
            </div>
            }
        </div>
    )
}
export default CarrierName;