import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: Attributes;
};

const initialState = {
  value: {
    data: [],
    meta: {
      offset: 0,
      limit: 10,
      searchText: "",
      sortBy: "name",
      sortDir: "asc",
      hasNextPage: true,
    },
  },
} as InitialState;

export const attributes = createSlice({
  initialState,
  name: "attributes",
  reducers: {
    addAttributes: (state, action: PayloadAction<Attributes>) => {
      state.value.data.push(...action.payload.data);
      state.value.meta = action.payload.meta;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { addAttributes, reset } = attributes.actions;
export default attributes.reducer;
