export type FreightData = {
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
    special_rate_id: string;
};
