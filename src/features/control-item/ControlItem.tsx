import './ControlItem.css';
import {Control} from "../../models/Timer.model";
import React from "react";
import {setTimerControl} from "./timerControlsSlice";
import {ControlIds} from "../../models/enums/controls.enums";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

type ControlItemProps = {
    control: Control;
}

export default function ControlItem({control}: ControlItemProps) {
    const dispatch = useAppDispatch();
    const timerType = useAppSelector(state => state.timerType.value);

    const handleControlClick = (e: React.MouseEvent) => {
        const isDecrementControl = (e?.target as HTMLElement)?.textContent === '-';
        const isBreakTimerControl = (e?.target as HTMLElement).id.includes(ControlIds.BREAKLENGTH);
        const payload = {
            isDecrement: isDecrementControl,
            isBreakTime: isBreakTimerControl,
            timerType: timerType,
            incrementValue: control.incrementValue
        }

        dispatch(setTimerControl(payload));
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
