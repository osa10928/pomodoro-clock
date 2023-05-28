import {AnyAction, combineReducers, configureStore, PreloadedState, ThunkAction} from "@reduxjs/toolkit";
import timerReducer from '../features/timer/timerSlice';
import timerTypeReducer from '../features/timer-type/timerTypeSlice';
import timerControlsReducer from '../features/control-item/timerControlsSlice'

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
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>
