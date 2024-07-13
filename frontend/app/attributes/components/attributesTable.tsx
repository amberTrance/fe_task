"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./attributesTable.module.css";

type AttributesTableProps = {
  attributes: Attributes;
};

export const AttributesTable = ({ attributes }: AttributesTableProps) => {
  const router = useRouter();

  // --- STATE ---

  const [offset, setOffset] = useState(0);

  // --- HELPERS ---

  const attributesRows = attributes.data.map((attribute) => (
    <tr
      key={attribute.name}
      onClick={() => router.push(`/attributes/${attribute.id}`)}
    >
      <td className={styles.cell}>{attribute.name}</td>
      <td className={styles.cell}>{attribute.name}</td>
      <td className={styles.cell}>{attribute.createdAt}</td>
    </tr>
  ));

  // --- RENDER ---

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th className={styles.tableHeader}>Name</th>
          <th className={styles.tableHeader}>Labels</th>
          <th className={styles.tableHeader}>Created At</th>
        </tr>

        {attributesRows}
      </tbody>
    </table>
  );
};
