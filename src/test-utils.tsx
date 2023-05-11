import {RenderOptions, render} from "@testing-library/react";
import {PreloadedState} from "@reduxjs/toolkit";
import {RootState, setupStore, Store} from "./redux/store";
import React, {PropsWithChildren} from "react";
import {Provider} from "react-redux";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
 preloadedState?: PreloadedState<RootState>
 store?: Store
}

export function renderWithProviders (
    ui: React.ReactElement,
    {
     preloadedState = {},
     store = setupStore(preloadedState),
     ...renderOptions
    }: ExtendedRenderOptions = {}
) {
 function Wrapper({ children }: PropsWithChildren<{}>) {
  return <Provider store={store}>
           {children}
         </Provider>
 }

 return { store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}
