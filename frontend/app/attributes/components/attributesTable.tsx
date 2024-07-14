"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMount } from "react-use";
import { isEmpty } from "lodash";

import styles from "./attributesTable.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { addAttributes } from "@/app/redux/features/attributesSlice";
import { fetchAttributes } from "@/app/redux/thunks";

type AttributesTableProps = {
  attributesServer: Attributes;
  labelsServer: Labels;
};

export const AttributesTable = ({
  attributesServer,
  labelsServer,
}: AttributesTableProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  console.log(labelsServer);

  const containerRef = useRef<HTMLTableRowElement | null>(null);
  const attributes = useAppSelector((state) => state.attributesReducer.value);

  // --- EFFECTS ---

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && attributes.meta.hasNextPage) {
          dispatch(fetchAttributes());
        }
      },
      {
        threshold: 1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [attributes.meta.hasNextPage, containerRef, dispatch]);

  useMount(() => {
    if (isEmpty(attributes.data)) {
      dispatch(addAttributes(attributesServer));
    }
  });

  // --- HELPERS ---

  const attributesRows = attributes.data.map((attribute) => {
    const labels = attribute.labelIds.map(
      (labelId) => labelsServer.data.find((label) => label.id === labelId)?.name
    );

    return (
      <tr
        key={attribute.name}
        onClick={() => router.push(`/attributes/${attribute.id}`)}
      >
        <td className={styles.cell}>{attribute.name}</td>
        <td className={styles.cell}>{labels.join(", ")}</td>
        <td className={styles.cell}>{attribute.createdAt}</td>
      </tr>
    );
  });

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
        <tr ref={containerRef}></tr>
      </tbody>
    </table>
  );
};
