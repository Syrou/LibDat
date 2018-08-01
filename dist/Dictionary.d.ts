export default class Dictionary<K, V> {
    map: Map<K, V>;
    constructor();
    setValue(key: K, value: V): void;
    remove(key: K): void;
    getValue(key: K): V | undefined;
    containsKey(key: K): boolean;
    size(): Number;
}
