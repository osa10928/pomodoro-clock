import {configureStore} from "@reduxjs/toolkit";
import timerReducer from './features/timerSlice';
import timerTypeReducer from './features/timerTypeSlice';
import timerControlsReducer from './features/timerControlsSlice'

export const store =  configureStore({
    reducer: {
        timer: timerReducer,
        timerType: timerTypeReducer,
        timerControls: timerControlsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
