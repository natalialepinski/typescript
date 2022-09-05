import { domInjector } from "../decorators/dom-injector.js";
import { executionTimeLog } from "../decorators/execution-time-log.js";
import { inspect } from "../decorators/inspect.js";
import { WorkingDays } from "../enums/working-days.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { negotiationsService } from "../services/negotiations-service.js";
import { print } from "../utils/print.js";
import { MessageView } from "../views/message-view.js";
import { NegotiationsView } from "../views/negotiations-view.js";

export class NegotiationController {
    @domInjector('#date')
    private inputDate: HTMLInputElement;
    @domInjector('#quantity')
    private inputQuantity: HTMLInputElement;
    @domInjector('#value')
    private inputValue: HTMLInputElement;
    private negotiations = new Negotiations();
    private negotiationsView = new NegotiationsView('#negotiationsView');
    private messageView = new MessageView('#messageView');
    private negotiationsService = new negotiationsService();

    constructor() {
        this.negotiationsView.update(this.negotiations);
    }

    @inspect
    @executionTimeLog()
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
        print(negotiation);
        this.clearForm();     
        this.updateView();   
    }

    public importData(): void {
        this.negotiationsService.getTodaysNegotiations()
            .then(todaysNegotiations => {
                return todaysNegotiations.filter(todaysNegotiations => {
                    return !this.negotiations.list().some(negotiation => negotiation.isEqual(todaysNegotiations));
                });
            })
            .then(todaysNegotiations => {
                for (let negotiation of todaysNegotiations) {
                    this.negotiations.add(negotiation);
                }
                this.negotiationsView.update(this.negotiations);
            });
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