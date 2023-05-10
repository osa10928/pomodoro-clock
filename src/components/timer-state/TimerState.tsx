import React, {MouseEventHandler} from "react";
import './TimerState.css';
import {TimerType} from "../../models/Timer.model";

type TimerStateProps = {
    timerType: TimerType;
    onClick: MouseEventHandler<Element>;
}
export default function TimerState({timerType, onClick}: TimerStateProps,) {

    const toggleTimer = (e: React.MouseEvent) => {
        onClick(e)
    }

    return (
        <div onClick={toggleTimer} id="controls-timer-state-container">
            <span id="timer-state-break-button" className="timer-state-button">{TimerType.breakTimer}</span>
            <span id="timer-state-space-button" className={`timer-state-button ${timerType === TimerType.studyTimer ? 'move' : ''}`}></span>
            <span id="timer-state-session-button" className={`timer-state-button ${timerType === TimerType.studyTimer ? 'move' : ''}`}>{TimerType.studyTimer}</span>
        </div>
    )
}
