'use client'

import Rate from "@/components/Rate";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";


export default function Home() {

    const fetchRates = async () => {
        try{
            const res = await axios.get("/api/Rates")
            return res.data;
        } catch(error) {
            console.log(error)
        }
  }

    const { data, isLoading } = useQuery({
        queryKey: ["rates"], 
        queryFn: fetchRates
    })
    
  console.log(data)
  if (isLoading) return <div>Loading...</div>
        
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-black">
        <div className="flex gap-4">
            <Rate />
        </div>
        {JSON.stringify(data)}
    </main>
  );
}
