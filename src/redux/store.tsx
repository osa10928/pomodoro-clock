import {combineReducers, configureStore, PreloadedState} from "@reduxjs/toolkit";
import timerReducer from './features/timerSlice';
import timerTypeReducer from './features/timerTypeSlice';
import timerControlsReducer from './features/timerControlsSlice'

export const rootReducer = combineReducers({
    timer: timerReducer,
    timerType: timerTypeReducer,
    timerControls: timerControlsReducer
})
export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState: preloadedState
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type Store = ReturnType<typeof setupStore>
export type AppDispatch = Store['dispatch'];
