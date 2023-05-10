import './App.css';
import React, {useState} from "react";
import ControlItem from "./components/control-item/ControlItem";
import TimerComponent from "./components/timer/TimerComponent"
import TimerState from "./components/timer-state/TimerState";
import {TimerControl, TimerType} from "./models/Timer.model";
import {APPTIMER} from "./configs/timers.config";

function App() {
    const [breakTime, setBreakTime] = useState(5);
    const [studyTime, setStudyTime] = useState(45);
    const [timer, setTimer] = useState(APPTIMER);

    const controls: TimerControl = {
        breakTimer: {
            name: TimerType.breakTimer,
            id: 'break-length-controls',
            controlTime: breakTime
        },
        studyTimer: {
            name: TimerType.studyTimer,
            id: 'session-length-controls',
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
                if (timer.timerType === TimerType.breakTimer) updateTimer(false, (breakTime - 1) * 60);
                setBreakTime(breakTime - 1);
            } else {
                if (timer.timerType === TimerType.breakTimer) updateTimer(false, (breakTime + 1) * 60);
                setBreakTime(breakTime + 1);
            }
        } else {
            if (isMinusButton) {
                if (studyTime > 2) {
                    if (timer.timerType === TimerType.studyTimer) updateTimer(false, (studyTime - 1) * 60);
                    setStudyTime(studyTime - 1);
                } else {
                    alert ("You should study for at least 2 minutes straight, right?");
                }
            } else {
                if (timer.timerType === TimerType.studyTimer) updateTimer(false, (studyTime + 1) * 60);
                setStudyTime(studyTime + 1)
            }
        }
    }

    const handleTimerTypeClick = () => {
        if (timer.timerType === TimerType.breakTimer) {
            timer.timerType = TimerType.studyTimer
            updateTimer(false, studyTime * 60)
        } else {
            timer.timerType = TimerType.breakTimer;
            updateTimer(false, breakTime * 60);
        }

        setTimer({...timer});
    }

    const updateTimer = (newTimerState: boolean, newDuration: number) => {
        if (!newTimerState && timer.timeoutInterval) clearInterval(timer.timeoutInterval);
        if (timer.isRunning !== newTimerState) timer.isRunning = newTimerState;
        if (timer.duration !== newDuration) timer.duration = newDuration;

        setTimer({...timer});
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
                    <TimerState timerType={timer.timerType} onClick={handleTimerTypeClick} />
                    <ControlItem control={controls.studyTimer} onClick={handleControlClick} />
                </section>
                <section id="timer-container" className="section-container">
                    <TimerComponent timer={timer} updateTimer={updateTimer} />
                </section>
            </main>
        </div>
      );
}

export default App;
