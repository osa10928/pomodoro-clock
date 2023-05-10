import React from "react";
import './TimerComponent.css';
import {TimerType} from '../../models/Timer.model';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {decrementBreakTime, decrementStudyTime} from "../../redux/features/timerControlsSlice";
import {setTimerInterval} from "../../redux/features/timerSlice";

export default function TimerComponent() {
    const dispatch = useAppDispatch();
    const timerInterval = useAppSelector(state => state.timer.interval);
    const timerType = useAppSelector(state => state.timerType.value);
    const breakTime = useAppSelector(state => state.timerControls.breakTime);
    const studyTime = useAppSelector(state => state.timerControls.studyTime);
    const timerContainer = document.querySelector(`#timer-time`);
    let duration =  timerType === TimerType.breakTimer ? breakTime : studyTime;
    const minute = (duration / 60) < 10 ? `0${Math.floor(duration / 60)}` : `${Math.floor(duration / 60)}`;
    let second = (duration % 60) < 10 ? `0${Math.floor(duration % 60)}` : `${Math.floor(duration % 60)}`;
    const timeLeft = `${minute}:${second}`;

    const intervalCallback = () => {
        if (timerContainer) timerContainer.textContent = timeLeft;

        duration--;

        if (timerType === TimerType.breakTimer) {
            dispatch(decrementBreakTime(1));
        } else {
            dispatch(decrementStudyTime(1))
        }

        if (duration < 0) {
            clearInterval(timerInterval);
            dispatch(setTimerInterval(timerInterval));
            return;
        }
    }

    const toggleTimer = () => {
        if (!timerInterval) {
            dispatch(setTimerInterval(setInterval(intervalCallback, 1000)));
        } else {
            clearInterval(timerInterval);
            dispatch(setTimerInterval(undefined));
        }
    }

    return (
        <button id="timer-button" onClick={toggleTimer}>
            <p>Start {timerType}</p>
            <p id="timer-time">{timeLeft}</p>
        </button>
    )
}
