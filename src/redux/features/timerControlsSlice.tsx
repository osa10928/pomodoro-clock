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
        decrementStudyTime: (state, action: PayloadAction<number>) => {
            state.studyTime -= action.payload;
        },
        incrementStudyTime: (state, action: PayloadAction<number>) => {
            state.studyTime += action.payload;
        },
        setStudyTime: (state, action: PayloadAction<number>) => {
            state.studyTime = action.payload;
        },
        decrementBreakTime: (state, action: PayloadAction<number>) => {
            state.breakTime -= action.payload;
        },
        incrementBreakTime: (state, action: PayloadAction<number>) => {
            state.breakTime += action.payload;
        },
        setBreakTime: (state, action: PayloadAction<number>) => {
            state.breakTime = action.payload;
        }
    }
})

export const { decrementStudyTime,
    incrementStudyTime, setStudyTime,
    decrementBreakTime, incrementBreakTime,
    setBreakTime } = timerControlsSlice.actions;
export const selectStudyTime = (state: RootState) => state.timerControls.studyTime;
export const selectBreakTime = (state: RootState) => state.timerControls.breakTime;
export default timerControlsSlice.reducer;
