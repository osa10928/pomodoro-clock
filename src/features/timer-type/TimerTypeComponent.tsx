import React, {MouseEventHandler} from "react";
import './TimerTypeComponent.css';
import {TimerType} from "../../models/Timer.model";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setTimerType} from "./timerTypeSlice";

export default function TimerTypeComponent() {
    const dispatch = useAppDispatch();
    const breakTime = useAppSelector(state => state.timerControls.breakTime);
    const studyTime = useAppSelector(state => state.timerControls.studyTime);

    const handleTimerTypeClick = () => {
        if (timerType === TimerType.studyTimer) {
            const payload = {
                timerType: TimerType.breakTimer,
                value: breakTime
            }
            dispatch(setTimerType(payload));
        } else {
            const payload = {
                timerType: TimerType.studyTimer,
                value: studyTime
            }
            dispatch(setTimerType(payload));
        }
    }

    const timerType = useAppSelector(state => state.timerType.value);

    return (
        <div onClick={handleTimerTypeClick} data-testid="controls-timer-state-container" id="controls-timer-state-container">
            <span id="timer-state-break-button" className="timer-state-button">{TimerType.breakTimer}</span>
            <span id="timer-state-space-button" className={`timer-state-button ${timerType === TimerType.studyTimer ? 'move' : ''}`}></span>
            <span id="timer-state-session-button" className={`timer-state-button ${timerType === TimerType.studyTimer ? 'move' : ''}`}>{TimerType.studyTimer}</span>
        </div>
    )
}
