import React from "react";
import './TimerComponent.css';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setIntervalThunk, setTimerInterval, setTimerValue, stopTimer} from "./timerSlice";

export default function TimerComponent() {
    const dispatch = useAppDispatch();
    const timerInterval = useAppSelector(state => state.timer.interval);
    const timerType = useAppSelector(state => state.timerType.value);
    let duration =  useAppSelector(state => state.timer.value);
    const minute = (duration / 60) < 10 ? `0${Math.floor(duration / 60)}` : `${Math.floor(duration / 60)}`;
    let second = (duration % 60) < 10 ? `0${Math.floor(duration % 60)}` : `${Math.floor(duration % 60)}`;
    const timeLeft = `${minute}:${second}`;

    const toggleTimer = () => {
        if (!timerInterval) {
            dispatch(setIntervalThunk());
        } else {
            dispatch(stopTimer());
        }
    }

    return (
        <button id="timer-button" data-testid="timer-button" onClick={toggleTimer}>
            <p id="timer-label" data-testid="timer-label">Start {timerType}</p>
            <p id="timer-time" data-testid="timer-time">{timeLeft}</p>
        </button>
    )
}
