"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./App.css");
var Pads_1 = require("./Components/Pads");
function App() {
    return (React.createElement("div", { className: "App" },
        React.createElement("header", null,
            React.createElement("div", { className: "machine" },
                React.createElement("h1", null, "Loop Machine"))),
        React.createElement("body", null,
            React.createElement("div", { className: "content" },
                React.createElement(Pads_1.PadsComponent, null)))));
}
exports.default = App;
//# sourceMappingURL=App.js.map