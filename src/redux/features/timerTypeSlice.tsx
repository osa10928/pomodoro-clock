import {createSlice} from "@reduxjs/toolkit";
import {TimerType} from "../../models/Timer.model";
import {RootState} from "../store";

interface TimerTypeState {
    value: TimerType
}

const initialState: TimerTypeState = {
    value: TimerType.studyTimer
}
export const timerTypeSlice = createSlice({
    name: 'timerType',
    initialState,
    reducers: {
        toggleTimerType: (state) => {
            state.value === TimerType.studyTimer ?
                state.value = TimerType.breakTimer :
                state.value = TimerType.studyTimer;
        }
    }
})

export const {toggleTimerType} = timerTypeSlice.actions;
export default timerTypeSlice.reducer;
