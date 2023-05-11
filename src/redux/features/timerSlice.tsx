import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {decrementBreakTime, decrementStudyTime, incrementBreakTime, incrementStudyTime} from "./timerControlsSlice";

interface TimerState {
    value: number,
    interval: undefined | NodeJS.Timeout
}

const initialState: TimerState = {
    value: 60 * 45,
    interval: undefined
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
    }
})

export const {setTimerInterval, setTimerValue} = timerSlice.actions;
export default timerSlice.reducer
