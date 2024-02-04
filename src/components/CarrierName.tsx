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
}[]

const CarrierName = ({ results }: { results: Data}) => {
    const [selected, setSelected] = useState(results)
    const uniqueCarrierNames = new Set(results.map(d => d.carrier_name))
    const filterRate = (name: string) => {
        const rate = results.filter(d => d.carrier_name === name)
        setSelected(rate)
    }

    return (
        <div className=" flex flex-col gap-8 w-full">
            <div className="flex gap-4 overflow-hidden scrollbar w-full">
            {Array.from(uniqueCarrierNames).map((name, index) => (
                <Button key={index} onClick={() => filterRate(name)}  className="text-lg px-4 py-5 font-normal border text-black bg-white">{name}</Button>
                ))}
            </div>
            <RateCard selected={selected} />
        </div>
    )
}
export default CarrierName;