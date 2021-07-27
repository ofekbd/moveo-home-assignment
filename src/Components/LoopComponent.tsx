import * as React from 'react';



export type Props = {
    path: string;
    play: boolean;
    ended: number;
    onSongEnd: Function;
    onSongStart: Function;
    onLoopPlay: Function;
    onLoopPause: Function;
    counter: number;
}

export type LoopState = {
    play: boolean;
    audio: HTMLMediaElement;
    isIn: boolean;
    
}

export class LoopComponent extends React.Component<Props, LoopState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            play: false,
            audio: new Audio(this.props.path),
            isIn: false
        }
        
    }

    componentDidMount = () => {
        this.state.audio.addEventListener('play', () => {
            this.props.onSongStart();
            this.setState({ isIn: true });
        })
    }

    componentDidUpdate = () => {
        this.state.audio.addEventListener('ended', () => {
            this.state.audio.currentTime = 0;
            this.props.onSongEnd();
            this.state.audio.play();

        });
    }


    togglePlay = () => {
        this.setState({ play: !this.state.play }
        );
        if (!this.state.play) {
            this.setState({ isIn: false });
            this.props.onLoopPause();
        }
        else {
            this.props.onLoopPlay();
        }
        
    }
    playPause = () => {
        if (this.state.play && this.props.play && (this.props.ended === 0 || this.state.isIn || this.props.counter === 1)) {
            this.state.audio.play();
        
        }
        else{
            this.state.audio.pause();
            this.state.audio.currentTime = 0;
            
            
        }
    }


    render() {
        return (
            <li title={this.props.path} className='pad'>
            <div>
                <label className="switch">
                    <input type="checkbox" onChange={this.togglePlay} />
                    <span className="slider round"></span>
                </label>
                <audio id='audio' src={this.props.path} loop />
                {this.playPause()}
                
            </div></li>);
    }
} 