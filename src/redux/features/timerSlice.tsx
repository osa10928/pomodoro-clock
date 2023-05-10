import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

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
        setTimerInterval: (state, action: PayloadAction<undefined | NodeJS.Timeout>) => {
            state.interval = action.payload;
        }
    }
})

export const {setTimerInterval} = timerSlice.actions;
export default timerSlice.reducer
