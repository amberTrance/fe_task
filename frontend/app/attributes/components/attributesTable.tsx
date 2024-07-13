"use client";
import { useMount } from "react-use";
import { useDispatch } from "react-redux";

import { addAttributes } from "@/app/redux/features/attributesSlice";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import styles from "./attributesTable.module.css";
import { useState } from "react";

type AttributesTableProps = {
  attributes: Attributes;
};

export const AttributesTable = ({ attributes }: AttributesTableProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // --- STATE ---

  const [offset, setOffset] = useState(0);

  // --- HELPERS ---

  const attributesRows = attributes.data.map((attribute) => (
    <tr className={styles.cell} key={attribute.name}>
      <td className={styles.cell}>{attribute.name}</td>
      <td className={styles.cell}>{attribute.name}</td>
      <td className={styles.cell}>{attribute.createdAt}</td>
    </tr>
  ));

  // --- RENDER ---

  return (
    <table className={styles.table}>
      <tr className={styles.cell}>
        <th className={styles.cell}>Name</th>
        <th className={styles.cell}>Labels</th>
        <th className={styles.cell}>Created At</th>
      </tr>

      {attributesRows}
    </table>
  );
};
