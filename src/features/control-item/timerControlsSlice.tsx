import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {TimerType} from "../../models/Timer.model";
import {BREAKTIMERCONTROL, STUDYTIMERCONTROL} from "../../configs/timer-controls.config";

interface TimerControlsState {
    studyTime: number,
    breakTime: number
}

const initialState: TimerControlsState = {
    studyTime: STUDYTIMERCONTROL.controlTime,
    breakTime: BREAKTIMERCONTROL.controlTime
}

export interface SetTimerControlPayload {
    value: number,
    timerType: TimerType
}
export const timerControlsSlice = createSlice({
    name: 'timerControls',
    initialState,
    reducers: {
        setStudyTime: (state, action: PayloadAction<SetTimerControlPayload>) => {
            state.studyTime -= action.payload.value;
        },
        setBreakTime: (state, action: PayloadAction<SetTimerControlPayload>) => {
            state.breakTime += action.payload.value;
        }
    }
})

export const { setStudyTime, setBreakTime } = timerControlsSlice.actions;
export default timerControlsSlice.reducer;
