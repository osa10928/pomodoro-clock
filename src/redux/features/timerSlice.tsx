import {createSlice, Draft, isAction, PayloadAction} from "@reduxjs/toolkit";
import {TimerType} from "../../models/Timer.model";
import {setTimerType} from "./timerTypeSlice";
import {setBreakTime, setStudyTime} from "./timerControlsSlice";

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

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setTimerValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
        setTimerInterval: (state, action: PayloadAction<undefined | NodeJS.Timeout>) => {
            if (action.payload === undefined) clearInterval(state.interval);
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

export const {setTimerInterval, setTimerValue} = timerSlice.actions;
export default timerSlice.reducer
