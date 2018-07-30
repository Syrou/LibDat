"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor() {
        this.items = [];
    }
    size() {
        return this.items.length;
    }
    add(value) {
        this.items.push(value);
    }
    get(index) {
        return this.items[index];
    }
    toArray() {
        return this.items;
    }
    indexOf(element) {
        return this.items.indexOf(element);
    }
    clear() {
        this.items.splice(0, this.items.length);
    }
}
exports.default = List;
//# sourceMappingURL=List.js.map