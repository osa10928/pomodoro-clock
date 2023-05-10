import {Timer, TimerType} from "../models/Timer.model";

export const APPTIMER: Timer = {
    timerType: TimerType.studyTimer,
    isRunning: false,
    duration: 45 * 60,
    timeoutInterval: undefined
}
