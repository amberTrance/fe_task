"use client";

import { ChangeEvent } from "react";
import { debounce } from "lodash";

import styles from "./attributesSearch.module.css";
import { fetchAttributes } from "@/app/store/thunks";
import { useAppDispatch } from "@/app/store/hooks";

export const AttributesSearch = () => {
  const dispatch = useAppDispatch();

  // --- HELPERS ---

  const debounceSearchInput = debounce((input: string) => {
    dispatch(fetchAttributes({ offset: 0, searchText: input }));
  }, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debounceSearchInput(event.currentTarget.value);
  };

  // --- RENDER ---

  return (
    <input
      className={styles.input}
      onChange={handleChange}
      placeholder="Search by name"
    />
  );
};
