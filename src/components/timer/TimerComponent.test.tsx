import {fireEvent, screen, waitFor} from "@testing-library/react";
import {renderWithProviders} from "../../test-utils";
import TimerComponent from "./TimerComponent";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {incrementStudyTime} from "../../redux/features/timerControlsSlice";
import {useAppDispatch} from "../../redux/hooks";
import {setTimerValue} from "../../redux/features/timerSlice";

// Time in seconds (45 minutes)
const originalTimerValue = 45 * 60;
const timerIncrementInSeconds = 1;
const secondsToMilliSeconds = ((seconds:number) => 1000 * seconds);
jest.useFakeTimers();
describe('TimerComponent ', () => {

    test('toggles timer on and off', async () => {
        const renderedTimerComponentStore = renderWithProviders(<TimerComponent />).store;
        expect(renderedTimerComponentStore?.getState().timer.interval).toBe(undefined);

        fireEvent.click(screen.getByTestId('timer-time'));
        expect(renderedTimerComponentStore?.getState().timer.interval).toBeTruthy();

        fireEvent.click(screen.getByTestId('timer-time'));
        expect(renderedTimerComponentStore?.getState().timer.interval).toBe(undefined);
    })

    test('study timer turns on and off', () => {
        const renderedTimerComponentStore = renderWithProviders(<TimerComponent />).store;
        expect(renderedTimerComponentStore?.getState().timer.value).toBe(originalTimerValue);

        fireEvent.click(screen.getByTestId('timer-time'));
        act(() => {
            jest.advanceTimersByTime(secondsToMilliSeconds(timerIncrementInSeconds));
        })
        fireEvent.click(screen.getByTestId('timer-time'));

        expect(renderedTimerComponentStore?.getState().timer.value).toBe(originalTimerValue - timerIncrementInSeconds);
    })

    test('study timer turns off after it reaches 0', () => {
        const renderedTimerComponentStore = renderWithProviders(<TimerComponent />).store;

        fireEvent.click(screen.getByTestId('timer-time'));
        act(() => {
            jest.advanceTimersByTime(secondsToMilliSeconds(45 * 60));
        });
        expect(renderedTimerComponentStore?.getState().timer.value).toBe(0);

        // Run again for a while and see if the timer is still at 0
        act(() => {
            jest.advanceTimersByTime(secondsToMilliSeconds(45 * 60));
        });
        expect(renderedTimerComponentStore?.getState().timer.value).toBe(0);
        expect(renderedTimerComponentStore?.getState().timer.interval).toBe(undefined);
    })
})
