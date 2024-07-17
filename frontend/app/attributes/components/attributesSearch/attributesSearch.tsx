"use client";

import { ChangeEvent } from "react";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";

import styles from "./attributesSearch.module.css";
import { AppDispatch } from "@/app/store/store";
import { fetchAttributes } from "@/app/store/thunks";

export const AttributesSearch = () => {
  const dispatch = useDispatch<AppDispatch>();

  // --- HELPERS ---

  const debounceSearchInput = debounce((input: string) => {
    dispatch(fetchAttributes({ offset: 0, searchText: input }));
  }, 1000);

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
