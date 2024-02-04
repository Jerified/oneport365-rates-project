import { NextResponse } from 'next/server'

export async function POST(req: Request,res: Response) {
    try {
        const {size, type} = await req.json()
        
        console.log(size, type)
        // console.log(type)
        const response = await fetch(`https://oneport365.free.beeceptor.com/live_rates?container_size=${size}&container_type=${type}`)
        console.log(response)
        return NextResponse.json({data: response}, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        })

    }
}

export async function GET(req: Request,res: Response) {
    try {
        const response = await fetch(`/Rates`)
        console.log(response)
        return NextResponse.json({data: response}, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        })

    }
}