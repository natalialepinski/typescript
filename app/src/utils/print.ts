import { Printable } from "./printable.js";

export function print(...objects: Printable[]) {
    for (let obj of objects) {
        console.log(obj.toString());
    }
}