import React, {MouseEventHandler} from "react";
import './TimerState.css';
import {TimerType} from "../../models/Timer.model";
import {useAppSelector} from "../../redux/hooks";

type TimerStateProps = {
    onClick: MouseEventHandler<Element>;
}
export default function TimerState({onClick}: TimerStateProps,) {

    const toggleTimer = (e: React.MouseEvent) => {
        onClick(e)
    }

    const timerType = useAppSelector(state => state.timerType.value);

    return (
        <div onClick={toggleTimer} data-testid="controls-timer-state-container" id="controls-timer-state-container">
            <span id="timer-state-break-button" className="timer-state-button">{TimerType.breakTimer}</span>
            <span id="timer-state-space-button" className={`timer-state-button ${timerType === TimerType.studyTimer ? 'move' : ''}`}></span>
            <span id="timer-state-session-button" className={`timer-state-button ${timerType === TimerType.studyTimer ? 'move' : ''}`}>{TimerType.studyTimer}</span>
        </div>
    )
}
