import './ControlItem.css';
import {Control, TimerType} from "../../models/Timer.model";
import React, {MouseEventHandler} from "react";
import {setBreakTime, setStudyTime, SetTimerControlPayload} from "./timerControlsSlice";
import {stopTimer} from "../timer/timerSlice";
import {ControlIds} from "../../models/enums/controls.enums";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

type ControlItemProps = {
    control: Control;
}

export default function ControlItem({control}: ControlItemProps) {
    const dispatch = useAppDispatch();
    const timerType = useAppSelector(state => state.timerType.value);
    const timerInterval = useAppSelector(state => state.timer.interval);
    const payload = (differenceValue: number) => {
        return {value: differenceValue, timerType: timerType}
    }

    const handleControlClick = (e: React.MouseEvent) => {
        const isDecrementControl = (e?.target as HTMLElement)?.textContent === '-';
        const isBreakTimerControl = (e?.target as HTMLElement).id.includes(ControlIds.BREAKLENGTH);

        if (isBreakTimerControl) {
             if (isDecrementControl && control.controlTime > 0) {
                const decreaseAmount = control.controlTime % 60 === 0 ? 60 : (control.controlTime % 60);
                dispatch(setBreakTime(payload(-decreaseAmount)));
                if (timerType === TimerType.breakTimer && timerInterval) {
                    dispatch(stopTimer());
                }
            } else if (!isDecrementControl) {
                const increaseAmount = control.controlTime % 60 === 0 ? 60 : 60 - control.controlTime % 60;
                dispatch(setBreakTime(payload(increaseAmount)));
                if (timerType === TimerType.breakTimer && timerInterval) {
                    dispatch(stopTimer());
                }
            }
        } else {
            if (isDecrementControl) {
                if (control.minimumTime && control.controlTime > control.minimumTime) {
                    const decreaseAmount = control.controlTime % 60 === 0 ? 60 : control.controlTime % 60;
                    dispatch(setStudyTime(payload(decreaseAmount)));
                    if (timerType === TimerType.studyTimer) {
                        dispatch(stopTimer());
                    }
                } else {
                    alert ("You should study for at least 2 minutes straight, right?");
                }
            } else {
                const increaseAmount = control.controlTime % 60 === 0 ? 60 : 60 - control.controlTime % 60;
                dispatch(setStudyTime(payload(-increaseAmount)));
                if (timerType === TimerType.studyTimer) {
                    dispatch(stopTimer());
                }
            }
        }
    }

    return (
        <article id={`${control.id}`} className="control-item-container">
            <div className="control-name">
                {control.name}
            </div>
            <div className="control-button-group">
                <button onClick={handleControlClick} id={control.id + '-decrement'} data-testid={control.id + '-decrement'} className="control-button">-</button>
                <p data-testid={control.id + '-value'} className="control-value">{control.controlTime && Math.floor(control.controlTime / 60)}</p>
                <button onClick={handleControlClick} id={control.id + '-increment'} data-testid={control.id + '-increment'} className="control-button">+</button>
            </div>
        </article>
    )
}
