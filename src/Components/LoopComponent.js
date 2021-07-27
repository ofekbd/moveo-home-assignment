
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopComponent = void 0;
var React = require("react");
var LoopComponent = /** @class */ (function (_super) {
    __extends(LoopComponent, _super);
    function LoopComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () {
            _this.state.audio.addEventListener('play', function () {
                _this.props.onSongStart();
                _this.setState({ isIn: true });
            });
        };
        _this.componentDidUpdate = function () {
            _this.state.audio.addEventListener('ended', function () {
                _this.state.audio.currentTime = 0;
                _this.props.onSongEnd();
                _this.state.audio.play();
            });
        };
        _this.togglePlay = function () {
            _this.setState({ play: !_this.state.play });
            if (!_this.state.play) {
                _this.setState({ isIn: false });
                _this.props.onLoopPause();
            }
            else {
                _this.props.onLoopPlay();
            }
        };
        _this.playPause = function () {
            if (_this.state.play && _this.props.play && (_this.props.ended === 0 || _this.state.isIn || _this.props.counter === 1)) {
                _this.state.audio.play();
            }
            else {
                _this.state.audio.pause();
                _this.state.audio.currentTime = 0;
            }
        };
        _this.state = {
            play: false,
            audio: new Audio(_this.props.path),
            isIn: false
        };
        return _this;
    }
    LoopComponent.prototype.render = function () {
        return (React.createElement("li", { title: this.props.path, className: 'pad' },
            React.createElement("div", null,
                React.createElement("label", { className: "switch" },
                    React.createElement("input", { type: "checkbox", onChange: this.togglePlay }),
                    React.createElement("span", { className: "slider round" })),
                React.createElement("audio", { id: 'audio', src: this.props.path, loop: true }),
                this.playPause())));
    };
    return LoopComponent;
}(React.Component));
exports.LoopComponent = LoopComponent;
//# sourceMappingURL=LoopComponent.js.map
