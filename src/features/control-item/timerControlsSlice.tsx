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
    isDecrement: boolean,
    isBreakTime: boolean,
    timerType: TimerType,
    incrementValue: number
}
export const timerControlsSlice = createSlice({
    name: 'timerControls',
    initialState,
    reducers: {
        setTimerControl: (state, action: PayloadAction<SetTimerControlPayload>) => {
            switch(action.payload.isBreakTime) {
                case(true):
                    switch(action.payload.isDecrement) {
                        case(true):
                            if (state.breakTime > 0) {
                                state.breakTime -= action.payload.incrementValue;
                            }
                            break;
                        case(false):
                            state.breakTime += action.payload.incrementValue;
                            break;
                    }
                    break;
                case(false):
                    switch(action.payload.isDecrement) {
                        case(true):
                            if (STUDYTIMERCONTROL.minimumTime && state.studyTime > STUDYTIMERCONTROL.minimumTime) {
                                state.studyTime -= action.payload.incrementValue;
                            } else if (STUDYTIMERCONTROL.minimumTime && state.studyTime <= STUDYTIMERCONTROL.minimumTime) {
                                alert ("You should study for at least 2 minutes straight, right?");
                            }
                            break;
                        case(false):
                            state.studyTime += action.payload.incrementValue;
                            break;
                    }
                    break;
            }
        }
    }
})

export const { setTimerControl } = timerControlsSlice.actions;
export default timerControlsSlice.reducer;
