export class Negotiation {
    constructor(_date, _quantity, _value) {
        this._date = _date;
        this._quantity = _quantity;
        this._value = _value;
    }
    get volume() {
        return this._quantity * this._value;
    }
    get date() {
        const date = new Date(this._date.getTime());
        return date;
    }
}
