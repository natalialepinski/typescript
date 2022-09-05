export function inspect(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const methodOriginal = descriptor.value;
    descriptor.value = function (...args: Array<any>) {
        console.log(`Method: ${propertyKey}`);
        console.log(`parameters: ${JSON.stringify(args)}`);
        const returnMethod = methodOriginal.apply(this, args);
        console.log(`return: ${JSON.stringify(returnMethod)}`);
        return returnMethod;
    };
    return descriptor;
}
