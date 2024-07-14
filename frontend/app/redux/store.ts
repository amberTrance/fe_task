import { configureStore } from "@reduxjs/toolkit";
import attributesReducer from "./features/attributesSlice";
import labelsReducer from "./features/labelsSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    attributesReducer,
    labelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
