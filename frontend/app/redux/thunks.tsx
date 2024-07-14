import { getAttributes } from "../api/api";
import { addAttributes } from "./features/attributesSlice";
import { AppDispatch, RootState } from "./store";

export const fetchAttributes =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const meta = getState().attributesReducer.value.meta;
    const attributes = await getAttributes({ offset: meta.offset + 10 });

    dispatch(addAttributes(attributes));
  };
