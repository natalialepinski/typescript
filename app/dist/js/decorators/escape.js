export function escape(target, propertyKey, descriptor) {
    const methodOriginal = descriptor.value;
    descriptor.value = function (...args) {
        let returnMethod = methodOriginal.apply(this, args);
        if (typeof returnMethod === 'string') {
            returnMethod = returnMethod.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        return returnMethod;
    };
    return descriptor;
}
