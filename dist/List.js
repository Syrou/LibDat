"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = /** @class */ (function () {
    function List() {
        this.items = [];
    }
    List.prototype.size = function () {
        return this.items.length;
    };
    List.prototype.add = function (value) {
        this.items.push(value);
    };
    List.prototype.get = function (index) {
        return this.items[index];
    };
    List.prototype.toArray = function () {
        return this.items;
    };
    List.prototype.indexOf = function (element) {
        return this.items.indexOf(element);
    };
    List.prototype.clear = function () {
        this.items.splice(0, this.items.length);
    };
    return List;
}());
exports.default = List;
//# sourceMappingURL=List.js.map