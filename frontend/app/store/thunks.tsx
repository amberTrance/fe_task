import { getAttributesApi } from "../api/api";
import { addAttributes } from "./features/attributes/attributesSlice";
import { AppDispatch, RootState } from "./store";

type MetaProps = {
  offset?: number;
  sortBy?: "name" | "createdAt";
  sortDir?: "asc" | "desc";
  searchText?: string;
};

export const fetchAttributes =
  ({ offset, sortBy, sortDir, searchText }: MetaProps) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const meta = getState().attributesReducer.value.meta;
    const attributes = await getAttributesApi({
      offset: offset ?? meta.offset + 10,
      sortBy: sortBy ?? meta.sortBy,
      sortDir: sortDir ?? meta.sortDir,
      searchText: searchText ?? meta.searchText,
    });

    dispatch(addAttributes(attributes));
  };
