"use client"

import { GoDash } from 'react-icons/go'
import { FreightData } from "@/lib/types";

const RateCard = ({ selected }: { selected: FreightData[] }) => {

    if(selected.length === 0) {
        return <p>No Rates to Display</p> 
      }

    return (
        <div className=''>
            <div className='border-b border-gray-100 mt-2 mb-1  h-1 w-full'></div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pt-8 w-full">
                {selected.map((d, index) => {
                    let formatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0
                    })
                    const formatterAmount = formatter.format(Number(d.total_amount_usd))
                    return (
                        <div key={index} className="bg-white flex flex-col text-black  border-2 cursor-pointer hover:border-green-600 hover:transition-all hover:duration-150  border-gray-200 rounded-lg p-6">
                            <div className="flex justify-between gap-4">
                                <p>{d.carrier_name}</p>
                                <p className="flex gap-2 items-center">{d.origin_port_code}<GoDash />{d.destination_port_code}</p>
                            </div>
                            <p className='pt-3 text-[#073418] font-medium text-xl pb-6'>{formatterAmount}</p>
                            <div className='border-b border-gray-200  h-1 w-full'></div>
                            <div className='pt-6 flex justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-sm text-gray-500'>Sailing Date</p>
                                    <p className='text-sm'>{d.sailing_date === null ? 'N/A' : 'date'}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-sm text-gray-500'>Transit Time</p>
                                    <p className='text-sm'>{d.sailing_date === null ? 'N/A' : 'date'}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-sm text-gray-500'>Free Days</p>
                                    <p className='text-sm'>{d.detention_days + d.demurrage_days} days</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default RateCard;