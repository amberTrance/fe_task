import { RootState } from "../../store";

export const selectAttributes = (state: RootState) =>
  state.attributesReducer.value;
