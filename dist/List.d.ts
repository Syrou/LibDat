export default class List<T> {
    private items;
    constructor();
    size(): number;
    add(value: T): void;
    get(index: number): T;
    toArray(): Array<T>;
    indexOf(element: T): number;
    clear(): void;
}
