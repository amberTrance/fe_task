import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: Labels;
};

const initialState = {
  value: {
    data: [],
    meta: {
      offset: 0,
      limit: 10,
      hasNextPage: true,
    },
  },
} as InitialState;

export const labels = createSlice({
  initialState,
  name: "labels",
  reducers: {
    addlabels: (state, action: PayloadAction<Labels>) => {
      state.value.data.push(...action.payload.data);
      state.value.meta = action.payload.meta;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { addlabels, reset } = labels.actions;
export default labels.reducer;
