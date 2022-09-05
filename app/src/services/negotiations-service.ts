import { TodaysNegotiations } from "../interface/todays-negotiations.js";
import { Negotiation } from "../models/negotiation.js";

export class negotiationsService {
    public getTodaysNegotiations(): Promise<Negotiation[]> {
        return fetch('http://localhost:8080/data')
            .then(res => res.json())
            .then((data: TodaysNegotiations[]) => {
                return data.map(dt => {
                    return new Negotiation(new Date(), dt.times, dt.amount)
                })
            })
    }
}