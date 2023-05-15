import './App.css';
import React from "react";
import ControlItem from "./control-item/ControlItem";
import TimerComponent from "./timer/TimerComponent"
import TimerState from "./timer-state/TimerState";
import {TimerControl, TimerType} from "../models/Timer.model";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {setBreakTime, setStudyTime} from "../redux/features/timerControlsSlice";
import {setTimerInterval} from "../redux/features/timerSlice";
import {setTimerType} from "../redux/features/timerTypeSlice";

function App() {
    const dispatch = useAppDispatch();
    const breakTime = useAppSelector(state => state.timerControls.breakTime);
    const studyTime = useAppSelector(state => state.timerControls.studyTime);
    const timerInterval = useAppSelector(state => state.timer.interval);
    const timerType = useAppSelector(state => state.timerType.value);
    const controls: TimerControl = {
        breakTimer: {
            name: TimerType.breakTimer,
            id: 'break-length-controls',
            controlTime: breakTime
        },
        studyTimer: {
            name: TimerType.studyTimer,
            id: 'study-length-controls',
            controlTime: studyTime
        }
    }

    const handleControlClick = (e: React.MouseEvent) => {
        const isMinusButton = (e?.target as HTMLElement)?.textContent === '-';
        let isBreakLengthControl = false;
        const paths:EventTarget[] = e.nativeEvent.composedPath();
        for (const path of paths) {
            if ((path as HTMLElement).id?.includes(controls.breakTimer.id)) {
                isBreakLengthControl = true;
            }
        }

        if (isBreakLengthControl) {
            if (isMinusButton && breakTime > 0) {
                const decreaseAmount = breakTime % 60 === 0 ? 60 : breakTime % 60;
                dispatch(setBreakTime((breakTime - decreaseAmount)));
                if (timerType === TimerType.breakTimer && timerInterval) {
                    dispatch(setTimerInterval(undefined));
                }
            } else {
                const increaseAmount = breakTime % 60 === 0 ? 60 : 60 - breakTime % 60;
                dispatch(setBreakTime(breakTime + increaseAmount));
                if (timerType === TimerType.breakTimer && timerInterval) {
                    dispatch(setTimerInterval(undefined));
                }
            }
        } else {
            if (isMinusButton) {
                if (studyTime > 2) {
                    const decreaseAmount = studyTime % 60 === 0 ? 60 : studyTime % 60;
                    dispatch(setStudyTime(studyTime - decreaseAmount))
                    if (timerType === TimerType.studyTimer) {
                        dispatch(setTimerInterval(undefined));
                    }
                } else {
                    alert ("You should study for at least 2 minutes straight, right?");
                }
            } else {
                const increaseAmount = studyTime % 60 === 0 ? 60 : 60 - studyTime % 60;
                dispatch(setStudyTime(studyTime + increaseAmount));
                if (timerType === TimerType.studyTimer) {
                    console.log('is incrementing')
                    dispatch(setTimerInterval(undefined));
                }
            }
        }
    }

    const handleTimerTypeClick = () => {
        dispatch(setTimerInterval(undefined));
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

    return (
        <div className="App">
            <header>
                <h1 className="text-center" id="title">
                    Study Timer
                </h1>
            </header>
            <main>
                <section id="controls-container" className="section-container">
                    <ControlItem control={controls.breakTimer} onClick={handleControlClick} />
                    <TimerState onClick={handleTimerTypeClick} />
                    <ControlItem control={controls.studyTimer} onClick={handleControlClick} />
                </section>
                <section id="timer-container" className="section-container">
                    <TimerComponent />
                </section>
            </main>
        </div>
      );
}

export default App;
