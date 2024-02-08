import { NextResponse } from 'next/server'

export async function POST(req: Request,res: Response) {
    try {
        const {size, type} = await req.json()
        
        console.log(size)
        const response = await fetch(`https://test-api.oneport365.com/api/live_rates/get_special_rates_no_auth?container_size=${size}&container_type=${type}`)
        console.log(response)
        return Response.json({data: response}, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        })

    }
}