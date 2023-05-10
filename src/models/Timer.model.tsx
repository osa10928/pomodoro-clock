export interface TimerControl {
    breakTimer: Control,
    studyTimer: Control
}

export interface Control {
    name: string;
    id: string;
    controlTime: number;
}

export interface Timer {
    timerType: TimerType,
    isRunning: boolean,
    duration: number,
    timeoutInterval: NodeJS.Timeout | undefined
}

export enum TimerType {
    breakTimer = 'Break Timer',
    studyTimer = 'Study Timer'
}