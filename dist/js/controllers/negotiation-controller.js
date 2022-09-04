import { WorkingDays } from "../enums/working-days.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";
export class NegotiationController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView('#negotiationsView', true);
        this.messageView = new MessageView('#messageView');
        this.SATURDAY = 6;
        this.SUNDAY = 0;
        this.inputDate = document.querySelector('#date');
        this.inputQuantity = document.querySelector('#quantity');
        this.inputValue = document.querySelector('#value');
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        const negotiation = Negotiation.createNegotiation(this.inputDate.value, this.inputQuantity.value, this.inputValue.value);
        if (!this.isWorkingDay(negotiation.date)) {
            this.messageView.update('You can only add a negotiation on working days');
            return;
        }
        this.negotiations.add(negotiation);
        this.updateView();
        this.clearForm();
    }
    isWorkingDay(date) {
        return date.getDay() > WorkingDays.SUNDAY && date.getDay() < WorkingDays.SATURDAY;
    }
    clearForm() {
        this.inputDate.value = '';
        this.inputQuantity.value = '';
        this.inputValue.value = '';
        this.inputDate.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update('Negotiation was added.');
    }
}
