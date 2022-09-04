export class View {
    constructor(selector, removeScriptTag) {
        this.removeScriptTag = false;
        const element = document.querySelector(selector);
        if (element) {
            this.element = element;
        }
        else {
            throw Error(`Selector ${selector} does not exist.`);
        }
        if (removeScriptTag) {
            this.removeScriptTag = removeScriptTag;
        }
    }
    update(model) {
        let template = this.template(model);
        if (this.removeScriptTag) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.element.innerHTML = template;
    }
}
