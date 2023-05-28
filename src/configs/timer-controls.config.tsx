import {Control, TimerControl, TimerType} from "../models/Timer.model";
import {ControlIds} from "../models/enums/controls.enums";

export const BREAKTIMERCONTROL: Control = {
    name: TimerType.breakTimer,
    id: ControlIds.BREAKLENGTH,
    controlTime: 5 * 60
}

export const STUDYTIMERCONTROL: Control = {
    name: TimerType.studyTimer,
    id: ControlIds.STUDYLENGTH,
    controlTime: 45 * 60,
    minimumTime: 2 * 60
}
