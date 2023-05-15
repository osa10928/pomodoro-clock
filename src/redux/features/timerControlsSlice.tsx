import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface TimerControlsState {
    studyTime: number,
    breakTime: number
}

const initialState: TimerControlsState = {
    studyTime: 45 * 60,
    breakTime: 5 * 60
}
export const timerControlsSlice = createSlice({
    name: 'timerControls',
    initialState,
    reducers: {
        setStudyTime: (state, action: PayloadAction<number>) => {
            state.studyTime = action.payload;
        },
        setBreakTime: (state, action: PayloadAction<number>) => {
            state.breakTime = action.payload;
        }
    }
})

export const { setStudyTime, setBreakTime } = timerControlsSlice.actions;
export const selectStudyTime = (state: RootState) => state.timerControls.studyTime;
export const selectBreakTime = (state: RootState) => state.timerControls.breakTime;
export default timerControlsSlice.reducer;
