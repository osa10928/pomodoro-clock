import React from "react";
import './TimerComponent.css';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setTimerInterval, setTimerValue} from "../../redux/features/timerSlice";

export default function TimerComponent() {
    const dispatch = useAppDispatch();
    const timerInterval = useAppSelector(state => state.timer.interval);
    const timerType = useAppSelector(state => state.timerType.value);
    let duration =  useAppSelector(state => state.timer.value);
    const minute = (duration / 60) < 10 ? `0${Math.floor(duration / 60)}` : `${Math.floor(duration / 60)}`;
    let second = (duration % 60) < 10 ? `0${Math.floor(duration % 60)}` : `${Math.floor(duration % 60)}`;
    const timeLeft = `${minute}:${second}`;

    const intervalCallback = () => {
        duration--;
        if (duration >= 0) dispatch(setTimerValue(duration));
        if (duration < 0) {
            dispatch(setTimerInterval(undefined));
            return;
        }
    }

    const toggleTimer = () => {
        if (!timerInterval) {
            dispatch(setTimerInterval(setInterval(intervalCallback, 1000)));
        } else {
            dispatch(setTimerInterval(undefined));
        }
    }

    return (
        <button id="timer-button" onClick={toggleTimer}>
            <p>Start {timerType}</p>
            <p id="timer-time" data-testid="timer-time">{timeLeft}</p>
        </button>
    )
}
