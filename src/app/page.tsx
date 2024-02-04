// 'use client'

import Rate from "@/components/Rate";
// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import path from 'path'
import { promises as fs } from 'fs'
import RateCard from "@/components/RateCard";
import CarrierName from "@/components/CarrierName";
import { FreightData } from "@/lib/types";
import { Button } from '@/components/ui/button'
import { useState } from "react";


export default async function Home() {
    const jsonPath = path.join(process.cwd(), 'content.json');
    const jsonData = await fs.readFile(jsonPath, 'utf8');
    const data = JSON.parse(jsonData);
    const results: FreightData[] = data.data.rates
    // console.log(data.data.rates)

    const fetchRates = async () => {
        try {
            const res = await axios.get("/api/Rates")
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }

    // const { data, isLoading } = useQuery({
    //     queryKey: ["rates"], 
    //     queryFn: fetchRates
    // })

    return (
        <main className="p-8 max-w-8xl mx-auto ">
            <h1 className='font-medium text-4xl pb-8'>Special Rates</h1>
            <div className="flex gap-4">
                <Rate />
            </div>
            <div className="pt-4">
                <CarrierName results={results}/>
            </div>
        </main>
    );
}
