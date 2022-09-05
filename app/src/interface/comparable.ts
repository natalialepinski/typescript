export interface Comparable<T> {
    isEqual(obj: T): boolean;
}