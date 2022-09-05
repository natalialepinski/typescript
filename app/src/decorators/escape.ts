export function escape(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const methodOriginal = descriptor.value;
    descriptor.value = function(...args: Array<any>) {
        let returnMethod = methodOriginal.apply(this, args);
        if (typeof returnMethod === 'string') {
            returnMethod = returnMethod.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        return returnMethod;
    };
    return descriptor;
}