"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this.map = new Map();
    }
    Dictionary.prototype.setValue = function (key, value) {
        this.map.set(key, value);
    };
    Dictionary.prototype.remove = function (key) {
        this.map.delete(key);
    };
    Dictionary.prototype.getValue = function (key) {
        return this.map.get(key);
    };
    Dictionary.prototype.containsKey = function (key) {
        return this.map.has(key);
    };
    return Dictionary;
}());
exports.default = Dictionary;
//# sourceMappingURL=Dictionary.js.map