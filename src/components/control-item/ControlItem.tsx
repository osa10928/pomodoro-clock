import './ControlItem.css';
import {Control} from "../../models/Timer.model";
import {MouseEventHandler} from "react";

type ControlItemProps = {
    control: Control;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function ControlItem({control, onClick}: ControlItemProps) {
    return (
        <article id={`${control.id}`} className="control-item-container">
            <div className="control-name">
                {control.name}
            </div>
            <div className="control-button-group">
                <button onClick={onClick} data-testid={control.id + '-decrement'} className="control-button">-</button>
                <p data-testid={control.id + '-value'} className="control-value">{Math.floor(control.controlTime / 60)}</p>
                <button onClick={onClick} data-testid={control.id + '-increment'} className="control-button">+</button>
            </div>
        </article>
    )
}
