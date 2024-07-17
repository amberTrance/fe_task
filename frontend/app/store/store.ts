import { configureStore } from "@reduxjs/toolkit";

import attributesReducer from "./features/attributes/attributesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      attributesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
