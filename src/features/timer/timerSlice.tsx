import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TimerType} from "../../models/Timer.model";
import {setTimerType} from "../timer-type/timerTypeSlice";
import {setBreakTime, setStudyTime, SetTimerControlPayload} from "../control-item/timerControlsSlice";
import {AppThunk} from "../../app/store";
import {STUDYTIMERCONTROL} from "../../configs/timer-controls.config";

interface TimerState {
    value: number,
    interval: undefined | NodeJS.Timeout
}

const initialState: TimerState = {
    value: STUDYTIMERCONTROL.controlTime,
    interval: undefined
}

interface ToggleTimerPayload {
    timerType: TimerType,
    value: number
}

export const setIntervalThunk = (): AppThunk => {
    return (dispatch, getState) => {
        let duration = getState().timer.value;
        const intervalCallback = () => {
            duration--;
            if (duration >= 0) dispatch(setTimerValue(duration));
            if (duration < 0) {
                dispatch(setTimerInterval(undefined));
                return;
            }
        }
        dispatch(setTimerInterval(setInterval(intervalCallback, 1000)));
    }
}

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setTimerValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
        stopTimer: (state) => {
            clearInterval(state.interval);
            state.interval = undefined;
        },
        setTimerInterval: (state, action: PayloadAction<undefined | NodeJS.Timeout>) => {
            state.interval = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setTimerType, (state, action: PayloadAction<ToggleTimerPayload>) => {
                clearInterval(state.interval);
                state.interval = undefined;
                state.value = action.payload.value;
            })
            .addCase(setBreakTime, (state, action: PayloadAction<SetTimerControlPayload>) => {
                if (action.payload.timerType === TimerType.breakTimer) state.value += action.payload.value;
            })
            .addCase(setStudyTime, (state, action: PayloadAction<SetTimerControlPayload>) => {
                if (action.payload.timerType === TimerType.studyTimer) state.value -= action.payload.value;
            })
    }
})

export const {setTimerInterval, setTimerValue, stopTimer} = timerSlice.actions;
export default timerSlice.reducer
