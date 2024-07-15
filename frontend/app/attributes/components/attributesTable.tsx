"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMount } from "react-use";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";

import styles from "./attributesTable.module.css";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { addAttributes } from "@/app/redux/features/attributesSlice";
import { fetchAttributes } from "@/app/redux/thunks";
import { mapAttributesLabelIdsToLabels } from "../utils/helpers";
import { DeleteButton } from "@/app/components/deleteButton";

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

  const handleDelete = () => {};

  // --- HELPERS ---

  const attributesRows = attributes.data.map((attribute) => {
    const labels = mapAttributesLabelIdsToLabels({
      attribute,
      labels: labelsServer,
    });

    return (
      <tr
        key={attribute.name}
        onClick={() => router.push(`/attributes/${attribute.id}`)}
      >
        <td className={styles.cell}>{attribute.name}</td>
        <td className={styles.cell}>{labels.join(", ")}</td>
        <td className={styles.cell}>{attribute.createdAt}</td>
        <td className={styles.cell}>
          <DeleteButton handleDelete={handleDelete} />
        </td>
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
          <th className={styles.tableHeader}>Delete</th>
        </tr>

        {attributesRows}
        <tr ref={containerRef}></tr>
      </tbody>
    </table>
  );
};
