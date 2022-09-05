var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView('#negotiationsView');
        this.messageView = new MessageView('#messageView');
        this.negotiationsService = new negotiationsService();
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        const negotiation = Negotiation.createNegotiation(this.inputDate.value, this.inputQuantity.value, this.inputValue.value);
        if (!this.isWorkingDay(negotiation.date)) {
            this.messageView.update('You can only add a negotiation on working days');
            return;
        }
        this.negotiations.add(negotiation);
        print(negotiation);
        this.clearForm();
        this.updateView();
    }
    importData() {
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
__decorate([
    domInjector('#date')
], NegotiationController.prototype, "inputDate", void 0);
__decorate([
    domInjector('#quantity')
], NegotiationController.prototype, "inputQuantity", void 0);
__decorate([
    domInjector('#value')
], NegotiationController.prototype, "inputValue", void 0);
__decorate([
    inspect,
    executionTimeLog()
], NegotiationController.prototype, "add", null);
