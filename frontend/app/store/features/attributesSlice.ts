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
      state.value.meta = action.payload.meta;

      if (action.payload.meta.offset === 0) {
        state.value.data = [...action.payload.data];

        return;
      }

      state.value.data.push(...action.payload.data);
    },
    deleteAttribute: (state, action: PayloadAction<{ id: string }>) => {
      state.value.data = state.value.data.filter(
        (attribute) => attribute.id !== action.payload.id
      );
    },
    resetAttributes: () => {
      return initialState;
    },
  },
});

export const { addAttributes, resetAttributes, deleteAttribute } =
  attributes.actions;
export default attributes.reducer;
