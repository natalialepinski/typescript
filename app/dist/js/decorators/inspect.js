export function inspect(target, propertyKey, descriptor) {
    const methodOriginal = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Method: ${propertyKey}`);
        console.log(`parameters: ${JSON.stringify(args)}`);
        const returnMethod = methodOriginal.apply(this, args);
        console.log(`return: ${JSON.stringify(returnMethod)}`);
        return returnMethod;
    };
    return descriptor;
}
