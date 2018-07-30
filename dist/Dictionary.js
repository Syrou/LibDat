"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dictionary {
    constructor() {
        this.map = new Map();
    }
    setValue(key, value) {
        this.map.set(key, value);
    }
    remove(key) {
        this.map.delete(key);
    }
    getValue(key) {
        return this.map.get(key);
    }
    containsKey(key) {
        return this.map.has(key);
    }
}
exports.default = Dictionary;
//# sourceMappingURL=Dictionary.js.map