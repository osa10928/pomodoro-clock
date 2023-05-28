import './App.css';
import React from "react";
import ControlItem from "./features/control-item/ControlItem";
import TimerComponent from "./features/timer/TimerComponent"
import TimerTypeComponent from "./features/timer-type/TimerTypeComponent";
import {Control} from "./models/Timer.model";
import {useAppSelector} from "./app/hooks";
import {BREAKTIMERCONTROL, STUDYTIMERCONTROL} from "./configs/timer-controls.config";

function App() {
    const breakTime = useAppSelector(state => state.timerControls.breakTime);
    const studyTime = useAppSelector(state => state.timerControls.studyTime);
    const breakTimerControl: Control = {
        ...BREAKTIMERCONTROL,
        controlTime: breakTime
    }
    const studyTimerControl: Control = {
        ...STUDYTIMERCONTROL,
        controlTime: studyTime
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
                    <ControlItem control={breakTimerControl} />
                    <TimerTypeComponent />
                    <ControlItem control={studyTimerControl} />
                </section>
                <section id="timer-container" className="section-container">
                    <TimerComponent />
                </section>
            </main>
        </div>
      );
}

export default App;
