import {createSlice, Draft, isAction, PayloadAction} from "@reduxjs/toolkit";
import {TimerType} from "../../models/Timer.model";
import {setTimerType} from "./timerTypeSlice";
import {setBreakTime, setStudyTime} from "./timerControlsSlice";
import {AppThunk} from "../store";

interface TimerState {
    value: number,
    interval: undefined | NodeJS.Timeout
}

const initialState: TimerState = {
    value: 60 * 45,
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
            .addCase(setBreakTime, (state, action: PayloadAction<number>) => {
                state.value = action.payload;
            })
            .addCase(setStudyTime, (state, action) => {
                state.value = action.payload;
            })
    }
})

export const {setTimerInterval, setTimerValue, stopTimer} = timerSlice.actions;
export default timerSlice.reducer
