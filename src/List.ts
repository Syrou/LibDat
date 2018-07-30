export default class List<T> {
    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }

    toArray():Array<T>{
        return this.items;
    }

    indexOf(element:T){
        return this.items.indexOf(element);
    }

    clear(){
        this.items.splice(0, this.items.length);
    }
}