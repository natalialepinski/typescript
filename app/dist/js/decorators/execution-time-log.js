export function executionTimeLog(inSeconds = false) {
    return function (target, propertyKey, descriptor) {
        const methodOriginal = descriptor.value;
        descriptor.value = function (...args) {
            let divider = 1;
            let unity = 'milliseconds';
            if (inSeconds) {
                divider = 1000;
                unity = 'seconds';
            }
            const t1 = performance.now();
            const returnMethod = methodOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, execution time: ${t1 - t2 / divider} ${unity}.`);
            returnMethod;
        };
        return descriptor;
    };
}
