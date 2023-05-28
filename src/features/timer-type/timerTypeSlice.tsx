import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Timer, TimerType} from "../../models/Timer.model";
import {RootState} from "../../app/store";

interface TimerTypeState {
    value: TimerType
}

interface SetTimerPayload {
    timerType: TimerType,
    value: number
}

const initialState: TimerTypeState = {
    value: TimerType.studyTimer
}
export const timerTypeSlice = createSlice({
    name: 'timerType',
    initialState,
    reducers: {
        setTimerType: (state, action: PayloadAction<SetTimerPayload>) => {
            state.value = action.payload.timerType;
        }
    }
})

export const {setTimerType} = timerTypeSlice.actions;
export default timerTypeSlice.reducer;
