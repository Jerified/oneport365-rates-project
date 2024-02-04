"use client"

import { useState, useEffect } from "react";
import axios from 'axios'
import { Button } from '@/components/ui/button'
import RateCard from "@/components/RateCard";

type Data = {
    freightify_request_id: string;
    freightify_offer_id: string;
    carrier_name: string;
    carrier_image: string;
    carrier_scac: string;
    offer_type: string;
    route_schedule: any[];
    transit_time: string;
    service_type: string;
    sailing_date: null | string;
    demurrage_days: number;
    detention_days: number;
    valid_to: string;
    valid_from: string;
    commodity: string;
    total_amount_usd: null | number;
    total_amount_ngn: null | number;
    charge_breakdown: {
        ocean_charges: [
            {
                amount: null | number;
                amountUsd: null | number;
                description: string;
                qty: number;
                rateCurrency: string;
                rateBasis: string;
                rateTypeCode: string;
                paymentMethod: string;
                containerType: string;
                amountNgn: null | number;
                rateNgn: null | number;
            }
        ];
    };
    origin_port_code: string;
    destination_port_code: string;
}

type carrierNameProps = {
    results: Data[]
}

const ITEMS_PER_PAGE = 9

const CarrierName = ({ results }: carrierNameProps) => {
    const [selected, setSelected] = useState(() => {
        const firstCarrier = results[0].carrier_name
        const firstRate = results.filter(d => d.carrier_name === firstCarrier)
        return firstRate.slice(0, ITEMS_PER_PAGE)
    })
    const [selectedCarrier, setSelectedCarrier] = useState<string>("")
    const [carrierLength, setCarrierLength] = useState(() => {
        return selected.length
    })
    const [showAll, setShowAll] = useState(false)
    console.log(selected)
    const uniqueCarrierNames = new Set(results.map(d => d.carrier_name))
    const filterRate = (name: string) => {
        const rate = results.filter(d => d.carrier_name === name)
        setCarrierLength(rate.length)
        setSelected(rate.slice(0, ITEMS_PER_PAGE))
        setSelectedCarrier(name)
        setShowAll(false)
    }

    
    const handleToggle = () => {
        setShowAll(!showAll)
        if (showAll) {
            setSelected(results.slice(0, ITEMS_PER_PAGE));
        } else {
            setSelected(results.filter(d => d.carrier_name === selectedCarrier));
        }
    }
    
    return (
        <div className=" flex flex-col gap-4 w-full">
            <div className="flex gap-4 overflow-x-scroll scrollbar w-full">
                {Array.from(uniqueCarrierNames).map((name, index) => (
                    <Button key={index} onClick={() => filterRate(name)} className="text-lg px-4 py-6 font-normal border border-zinc-600 text-black bg-white hover:text-white">{name}</Button>
                ))}
            </div>
            <RateCard selected={selected} />
            {carrierLength > ITEMS_PER_PAGE && <div className='mx-auto flex flex-col gap-4 pt-5 '>
                <p className='text-center text-[0.9rem]'>Viewing {selected.length} of {carrierLength} special rates</p>
                <button onClick={handleToggle} className='w-fit mx-auto border-zinc-600 border bg-white text-black px-12 py-3 text-md rounded-md'>
                    {showAll ? "Show Less" : "Show All"}
                </button>
            </div>
            }
        </div>
    )
}
export default CarrierName;