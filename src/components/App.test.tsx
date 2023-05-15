import {renderWithProviders} from "../test-utils";
import App from "./App";
import {fireEvent, screen} from "@testing-library/react";

const secondsToLowestMinutes = (seconds: number) => Math.floor(seconds / 60);
const secondsToMilliseconds = (seconds: number) => seconds * 60;
const timerToMilliseconds = (timerTime: string) => {
    const [seconds, milliseconds] = timerTime.split(':');
    return (+seconds * 60 + (+milliseconds));
}

describe('Pomodoro Clock', () => {

    test('starts with a set break length and study length, and with clock on the study time', () => {
        const appStore = renderWithProviders(<App />).store;
        const breakTimeValue = appStore?.getState().timerControls.breakTime;
        const breakLengthDiv = screen.getByTestId('break-length-controls-value');
        expect(breakLengthDiv?.textContent).toBe(secondsToLowestMinutes(breakTimeValue).toString());

        const studyTimeValue = appStore?.getState().timerControls.studyTime;
        const studyLengthDiv = screen.getByTestId('study-length-controls-value');
        expect(studyLengthDiv?.textContent).toBe(secondsToLowestMinutes(studyTimeValue).toString());

        const clockDiv = screen.getByTestId('timer-time');
        const clockValue = appStore?.getState().timer.value;
        expect(timerToMilliseconds(clockDiv?.textContent as string)).toBe(clockValue);
    });

    test('can switch between break time and study time', () => {
        const appStore = renderWithProviders(<App />).store;

        const breakTimeValue = appStore?.getState().timerControls.breakTime;
        const studyTimeValue = appStore?.getState().timerControls.studyTime;
        const timerLabelDiv = screen.getByTestId('timer-label');
        const timerValueDiv = screen.getByTestId('timer-time');
        const timerStateButton = screen.getByTestId('controls-timer-state-container');

        fireEvent.click(timerStateButton);
        expect(timerLabelDiv.textContent).toBe('Start Break Timer');
        expect(timerToMilliseconds(timerValueDiv.textContent as string)).toBe(breakTimeValue);
        fireEvent.click(timerStateButton);
        expect(timerLabelDiv.textContent).toBe('Start Study Timer');
        expect(timerToMilliseconds(timerValueDiv.textContent as string)).toBe(studyTimeValue);
    })

    test('can decrease/increase break time', () => {
        const appStore = renderWithProviders(<App />).store;

        const breakTimeIncrementButton = screen.getByTestId('break-length-controls-increment');
        const breakTimeDecrementButton = screen.getByTestId('break-length-controls-decrement');
        const breakTimeDiv = screen.getByTestId('break-length-controls-value');

        expect(appStore?.getState().timerControls.breakTime).toBe(secondsToMilliseconds(5));
        expect(breakTimeDiv.textContent).toBe('5');

        fireEvent.click(breakTimeDecrementButton);
        expect(appStore?.getState().timerControls.breakTime).toBe(secondsToMilliseconds(4));
        expect(breakTimeDiv.textContent).toBe('4');

        fireEvent.click(breakTimeIncrementButton);
        fireEvent.click(breakTimeIncrementButton);
        expect(appStore?.getState().timerControls.breakTime).toBe(secondsToMilliseconds(6));
        expect(breakTimeDiv.textContent).toBe('6');
    })

    test('can decrease/increase study time', () => {
        const appStore = renderWithProviders(<App />).store;

        const studyTimeIncrementButton = screen.getByTestId('study-length-controls-increment');
        const studyTimeDecrementButton = screen.getByTestId('study-length-controls-decrement');
        const studyTimeDiv = screen.getByTestId('study-length-controls-value');

        expect(appStore?.getState().timerControls.studyTime).toBe(secondsToMilliseconds(45));
        expect(studyTimeDiv.textContent).toBe('45');

        fireEvent.click(studyTimeDecrementButton);
        expect(appStore?.getState().timerControls.studyTime).toBe(secondsToMilliseconds(44));
        expect(studyTimeDiv.textContent).toBe('44');

        fireEvent.click(studyTimeIncrementButton);
        fireEvent.click(studyTimeIncrementButton);
        expect(appStore?.getState().timerControls.studyTime).toBe(secondsToMilliseconds(46));
        expect(studyTimeDiv.textContent).toBe('46');
    })

    describe('when running', () => {

        test('stops if break time control is clicked and break time timer is running', () => {
            const appStore = renderWithProviders(<App />).store;

            const timerStateButton = screen.getByTestId('controls-timer-state-container');
            const timerLabelDiv = screen.getByTestId('timer-label');
            const breakTimeIncrementButton = screen.getByTestId('break-length-controls-increment');
            const breakTimeDecrementButton = screen.getByTestId('break-length-controls-decrement');

            fireEvent.click(timerStateButton);
            expect(timerLabelDiv.textContent).toBe('Start Break Timer');

            fireEvent.click(screen.getByTestId('timer-time'));
            expect(appStore?.getState().timer.interval).toBeTruthy();

            fireEvent.click(breakTimeIncrementButton);
            expect(appStore?.getState().timer.interval).toBe(undefined);

            fireEvent.click(screen.getByTestId('timer-time'));
            expect(appStore?.getState().timer.interval).toBeTruthy();

            fireEvent.click(breakTimeDecrementButton);
            expect(appStore?.getState().timer.interval).toBe(undefined);
        })

        test('stops if study time control is clicked and study time timer is running', () => {
            const appStore = renderWithProviders(<App />).store;

            const studyTimeIncrementButton = screen.getByTestId('study-length-controls-increment');
            const studyTimeDecrementButton = screen.getByTestId('study-length-controls-decrement');

            fireEvent.click(screen.getByTestId('timer-time'));
            expect(appStore?.getState().timer.interval).toBeTruthy();

            console.log('setting it in this test')
            fireEvent.click(studyTimeIncrementButton);
            expect(appStore?.getState().timer.interval).toBe(undefined);

            fireEvent.click(screen.getByTestId('timer-time'));
            expect(appStore?.getState().timer.interval).toBeTruthy();

            fireEvent.click(studyTimeDecrementButton);
            expect(appStore?.getState().timer.interval).toBe(undefined);
        })

    })
})
