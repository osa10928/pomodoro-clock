import React, {Dispatch, SetStateAction, useState} from "react";
import './TimerComponent.css';
import {Timer} from '../../models/Timer.model';

type TimerProps = {
    timer: Timer,
    updateTimer: (newTimerState: boolean, duration: number) => void;
}

//SetStateAction<undefined>

export default function TimerComponent({timer, updateTimer}: TimerProps) {
    const timerContainer = document.querySelector(`#timer-time`);
    let duration = timer.duration;
    const minute = (duration / 60) < 10 ? `0${Math.floor(duration / 60)}` : `${Math.floor(duration / 60)}`;
    let second = (duration % 60) < 10 ? `0${Math.floor(duration % 60)}` : `${Math.floor(duration % 60)}`;
    const timeLeft = `${minute}:${second}`;

    const intervalCallback = () => {
        if (timerContainer) timerContainer.textContent = timeLeft;

        duration--;

        if (duration < 0) {
            clearInterval(timer.timeoutInterval);
            updateTimer(false, 1000);
            return;
        }

        updateTimer(true, duration)
    }

    const toggleTimer = () => {
        if (!timer.isRunning) {
            timer.timeoutInterval = setInterval(intervalCallback, 1000);
            updateTimer(true, duration);
        } else {
            clearInterval(timer.timeoutInterval);
            updateTimer(false, duration);
        }
    }

    return (
        <button id="timer-button" onClick={toggleTimer}>
            <p>Start {timer.timerType}</p>
            <p id="timer-time">{timeLeft}</p>
        </button>
    )
}
