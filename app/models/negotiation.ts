export class Negotiation {
    constructor(
        private _date: Date, 
        public readonly _quantity: number, 
        public readonly _value: number
    ) {}

    get volume(): number {
        return this._quantity * this._value;
    }
    
    get date(): Date {
        const date = new Date(this._date.getTime());
        return date;
    }
}