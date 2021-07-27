
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
        // eslint-disable-next-line
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PadsComponent = void 0;
var React = require("react");
var react_media_recorder_1 = require("react-media-recorder");
var LoopComponent_1 = require("./LoopComponent");
var PadsComponent = /** @class */ (function (_super) {
    __extends(PadsComponent, _super);
    function PadsComponent() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.music = [
            "120_future_funk_beats_25", "SilentStar_120_Em_OrganSynth", "PAS3GROOVE1.03B", "MazePolitics_120_Perc",
            "GrooveB_120bpm_Tanggu", "FUD_120_StompySlosh", "electric guitar coutry slide 120bpm - B", "Bass Warwick heavy funk groove on E 120 BPM",
            "120_stutter_breakbeats_16"
        ];
        _this.state = {
            blobURL: '',
            recOn: false,
            play: false,
            showRecordSession: false,
            ended: 0,
            recordedSession: new Audio(''),
            counter: 0
        };
        _this.onStop = function (blobUrl) {
            _this.setState({ blobURL: blobUrl });
        };
        _this.onRecord = function (startRecording) {
            _this.setState({ recOn: true });
            startRecording();
        };
        _this.onStopRecord = function (stopRecording) {
            _this.setState({ recOn: false });
            stopRecording();
            _this.setState({ showRecordSession: true });
        };
        _this.onPlay = function () {
            _this.setState({ play: true });
        };
        _this.onPause = function () {
            _this.setState({ play: false });
        };
        _this.onDismiss = function () {
            if (_this.state.recordedSession) {
                _this.state.recordedSession.pause();
            }
            _this.setState({ showRecordSession: false, blobURL: '' });
        };
        /*We want each loop to be synchronized with the others, so every time a song finishes the current loop
         it updates the state ended and the songs that are waiting to be played knows its the time to start playing*/
        _this.onSongEnd = function () {
            _this.setState({ ended: 0 });
        };
        _this.onSongStart = function () {
            _this.setState({ ended: 1 });
        };
        /*We want to check if the current loop is the only/first one playing so it would start immidiately,
         so we keep a counter which updates according to the number of loops playing at the same time*/
        _this.onLoopPlay = function () {
            _this.setState({ counter: _this.state.counter - 1 });
        };
        _this.onLoopPause = function () {
            _this.setState({ counter: _this.state.counter + 1 });
        };
        _this.onPlaySession = function () {
            var recordedSession = new Audio(_this.state.blobURL);
            _this.setState({ recordedSession: recordedSession });
            recordedSession.play();
        };
        return _this;
    }
    PadsComponent.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control" },
            React.createElement("div", null,
                React.createElement(react_media_recorder_1.ReactMediaRecorder, { audio: true, render: function (_a) {
                        var status = _a.status, startRecording = _a.startRecording, stopRecording = _a.stopRecording;
                        return (React.createElement("div", { className: "record" },
                            React.createElement("p", null, status.toString() === "Recording" ? status : null),
                            _this.state.recOn ? React.createElement("button", { className: "RecOn" }) :
                                React.createElement("button", { className: "Rec", title: "record", onClick: function () { return _this.onRecord(startRecording); } }),
                            _this.state.recOn ? React.createElement("button", { className: "notRec", onClick: function () { return _this.onStopRecord(stopRecording); } }) : null,
                            _this.state.showRecordSession ? _this.state.blobURL !== '' ? React.createElement(React.Fragment, null,
                                React.createElement("button", { className: "recordingOptions", onClick: _this.onPlaySession }, "Play Session"),
                                React.createElement("a", { href: _this.state.blobURL, download: true },
                                    React.createElement("button", { className: "recordingOptions" },
                                        React.createElement("i", { className: "fas fa-download" }),
                                        "Download")),
                                React.createElement("button", { className: "dismiss", onClick: _this.onDismiss }, "Dismiss")) : null : null));
                    }, onStop: function (blobUrl) {
                        _this.onStop(blobUrl);
                    } }),
                React.createElement("div", { className: "playPause" }, !this.state.play ? React.createElement("button", { className: "play", title: "play", onClick: this.onPlay }) :
                    React.createElement("button", { className: "pause", title: "pause", onClick: this.onPause }))),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("ul", { className: 'pads' }, this.music.map(function (songPath) {
                return React.createElement(LoopComponent_1.LoopComponent, { path: "/" + songPath + ".mp3", play: _this.state.play, ended: _this.state.ended, onSongEnd: _this.onSongEnd, onSongStart: _this.onSongStart, onLoopPlay: _this.onLoopPlay, onLoopPause: _this.onLoopPause, counter: _this.state.counter });
            }))));
    };
    return PadsComponent;
}(React.Component));
exports.PadsComponent = PadsComponent;
//# sourceMappingURL=Pads.js.map