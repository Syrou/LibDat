"use strict";
exports.__esModule = true;
var DatContainer_1 = require("./src/DatContainer");
var path = require("path");
var testPath = path.join(process.cwd(), "assets", "/test");
var datContainer = new DatContainer_1.DatContainer(testPath, "AbyssObjects.dat", function (instance) {
    instance.SaveToJson();
});
