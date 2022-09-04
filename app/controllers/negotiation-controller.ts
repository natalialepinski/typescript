import { WorkingDays } from "../enums/working-days.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";

export class NegotiationController {
    private inputDate: HTMLInputElement;
    private inputQuantity: HTMLInputElement;
    private inputValue: HTMLInputElement;
    private negotiations = new Negotiations();
    private negotiationsView = new NegotiationsView('#negotiationsView', true);
    private messageView = new MessageView('#messageView');
    private readonly SATURDAY = 6;
    private readonly SUNDAY = 0;


    constructor() {
        this.inputDate = document.querySelector('#date') as HTMLInputElement;
        this.inputQuantity = document.querySelector('#quantity') as HTMLInputElement;
        this.inputValue = document.querySelector('#value') as HTMLInputElement;
        this.negotiationsView.update(this.negotiations);
    }

    public add(): void {
        const negotiation = Negotiation.createNegotiation(
            this.inputDate.value,
            this.inputQuantity.value,
            this.inputValue.value
        );
        if (!this.isWorkingDay(negotiation.date)) {
            this.messageView.update('You can only add a negotiation on working days');
            return;
        }
        this.negotiations.add(negotiation);
        this.updateView();
        this.clearForm();        
    }

    private isWorkingDay(date: Date) {
        return date.getDay() > WorkingDays.SUNDAY && date.getDay() < WorkingDays.SATURDAY;
    }
    private clearForm(): void {
        this.inputDate.value = '';
        this.inputQuantity.value = '';
        this.inputValue.value = '';
        this.inputDate.focus();
    }

    private updateView(): void {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update('Negotiation was added.')
    }
}