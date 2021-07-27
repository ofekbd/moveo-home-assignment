import * as React from 'react';
import { ReactMediaRecorder } from "react-media-recorder";
import { LoopComponent } from './LoopComponent';



export class PadsComponent extends React.Component {
    music: string[] = [
        "120_future_funk_beats_25", "SilentStar_120_Em_OrganSynth", "PAS3GROOVE1.03B", "MazePolitics_120_Perc",
        "GrooveB_120bpm_Tanggu", "FUD_120_StompySlosh", "electric guitar coutry slide 120bpm - B", "Bass Warwick heavy funk groove on E 120 BPM",
        "120_stutter_breakbeats_16"];

    state = {
        blobURL: '',
        recOn: false, 
        play: false,
        showRecordSession: false,/* we can hear the recorded session only if we recorded a song and did not dismiss it, this state is updated according to these situations*/
        ended: 0,
        recordedSession: new Audio(''), /*We keep the recorded session in a state in order to enable download and play */
        counter: 0
    } 


    onStop = (blobUrl: any) => {
        this.setState({ blobURL: blobUrl });
    }

    onRecord = (startRecording: Function) => {
        this.setState({ recOn: true });
        startRecording();
    }

    onStopRecord = (stopRecording: Function) => {
        this.setState({ recOn: false });
        stopRecording();
        this.setState({ showRecordSession: true });
    }

    onPlay = () => {
        this.setState({ play: true });
    }

    onPause = () => {
        this.setState({ play: false });
    }

    onDismiss = () => {
        if (this.state.recordedSession) {
            this.state.recordedSession.pause();
        }
        this.setState({ showRecordSession: false, blobURL:'' });
        
    }

    /*We want each loop to be synchronized with the others, so every time a song finishes the current loop
     it updates the state ended and the songs that are waiting to be played knows its the time to start playing*/
    onSongEnd = () => {
        this.setState({ ended: 0 });
    }

    onSongStart = () => {
        this.setState({ ended: 1 });
    }

    /*We want to check if the current loop is the only/first one playing so it would start immidiately, 
     so we keep a counter which updates according to the number of loops playing at the same time*/ 
    onLoopPlay = ()=>{
        this.setState({ counter: this.state.counter - 1 });
    }

    
    onLoopPause = () => {
        this.setState({ counter: this.state.counter + 1 });
    }

    onPlaySession = () => {
        var recordedSession = new Audio(this.state.blobURL);
        this.setState({ recordedSession: recordedSession });
        recordedSession.play();
    }

   

    

    render() {
        return (
            <div className="control">
                <div>
                    
                    <ReactMediaRecorder
                        audio
                        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (

                            <div className="record">
                                <p>{status.toString() === "Recording" ? status :null}</p>
                                {this.state.recOn ? <button className="RecOn"></button> :
                                    <button className="Rec" title="record" onClick={() => this.onRecord(startRecording)}></button>}
                                {this.state.recOn ? < button className="notRec" onClick={() => this.onStopRecord(stopRecording)}></button> : null}
                                {this.state.showRecordSession ? this.state.blobURL !== '' ? <><button className="recordingOptions" onClick={this.onPlaySession}>Play Session</button>
                                    <a href={this.state.blobURL} download><button className="recordingOptions"><i className="fas fa-download" />Download</button></a>
                                    <button className="dismiss" onClick={this.onDismiss}>Dismiss</button></> : null : null}
                            </div>
                        )}
                        onStop={(blobUrl) => {
                            this.onStop(blobUrl)
                        }} 
                    /> 
                    <div className="playPause">{!this.state.play ? <button className="play" title="play" onClick={this.onPlay}></button> :
                    <button className="pause" title="pause" onClick={this.onPause}></button>}</div>
                </div>
                <br /><br /><br /><br />

                
                <ul className='pads'>
                    
                    {this.music.map((songPath: string) =>
                        <LoopComponent
                            path={`/${songPath}.mp3`}
                            play={this.state.play}
                            ended={this.state.ended}
                            onSongEnd={this.onSongEnd}
                            onSongStart={this.onSongStart}
                            onLoopPlay={this.onLoopPlay}
                            onLoopPause={this.onLoopPause}
                            counter={this.state.counter} />)}
            </ul></div>);
    }
}
