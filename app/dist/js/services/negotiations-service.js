import { Negotiation } from "../models/negotiation.js";
export class negotiationsService {
    getTodaysNegotiations() {
        return fetch('http://localhost:8080/data')
            .then(res => res.json())
            .then((data) => {
            return data.map(dt => {
                return new Negotiation(new Date(), dt.times, dt.amount);
            });
        });
    }
}
