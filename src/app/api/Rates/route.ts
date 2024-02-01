import { OptionType } from '@/app/page'
import { NextResponse } from 'next/server'

export async function POST(req: Request,res: Response) {
    const {option} = await req.json()
    const options = [option]
    // console.log(options)

    // const option1 = options.find((option: OptionType) => option.label === 'Option1')
    // const option2 = options.find((option: OptionType) => option.label === 'Option2').value
    console.log(option1)
    const response = await fetch(`https://oneport365.free.beeceptor.com/live_rates?c ontainer_size=${option1}&container_type=${option2}`)
}