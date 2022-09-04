export abstract class View<T> {
    protected element: HTMLElement;
    private removeScriptTag = false;

    constructor(selector: string, removeScriptTag?: boolean) {
        const element = document.querySelector(selector);
        if (element) {
            this.element = element as HTMLElement;
        } else {
            throw Error(`Selector ${selector} does not exist.`)
        }
        if (removeScriptTag) {
            this.removeScriptTag = removeScriptTag;
        }
    }

    protected abstract template(model: T): string;

    public update(model: T): void {
        let template = this.template(model);
        if (this.removeScriptTag) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.element.innerHTML = template;
    }
}