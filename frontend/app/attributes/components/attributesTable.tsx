"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import styles from "./attributesTable.module.css";
import { AppDispatch, useAppSelector } from "@/app/store/store";
import {
  addAttributes,
  deleteAttribute,
} from "@/app/store/features/attributesSlice";
import { fetchAttributes } from "@/app/store/thunks";
import { mapAttributesLabelIdsToLabels } from "../utils/helpers";
import { DeleteButton } from "@/app/components/deleteButton";
import { deleteAttributeApi } from "@/app/api/api";
import { ConfirmationModal } from "@/app/components/confirmationModal/confirmationModal";

type AttributesTableProps = {
  attributesServer: Attributes;
  labelsServer: Labels;
};

type MetaProps = {
  offset?: number;
  sortBy?: "name" | "createdAt";
  sortDir?: "asc" | "desc";
  searchText?: string;
};

export const AttributesTable = ({
  attributesServer,
  labelsServer,
}: AttributesTableProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const containerRef = useRef<HTMLTableRowElement | null>(null);
  const attributes = useAppSelector((state) => state.attributesReducer.value);

  // --- STATE ---

  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [attributeToDelete, setAttributeToDelete] = useState<
    undefined | Attribute
  >();
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const toggleSortDir = () => {
    setSortDir((sortDir) => {
      if (sortDir === "asc") {
        return "desc";
      }

      return "asc";
    });
  };

  if (isEmpty(attributes.data)) {
    dispatch(addAttributes(attributesServer));
  }

  // --- EFFECTS ---

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && attributes.meta.hasNextPage) {
          dispatch(fetchAttributes({}));
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

  const handleClose = () => setIsDeleteModalShown(false);

  const handleConfirmDelete = async (attribute?: Attribute) => {
    if (!attribute) {
      return;
    }

    const { id, name } = attribute;

    try {
      await deleteAttributeApi({ id });

      dispatch(deleteAttribute({ id }));

      toast.success(`${name} was successfully deleted.`);
    } catch (error) {
      toast.error(`${name} couldn't be deleted. Try another time.`, {
        isLoading: false,
      });
    }

    handleClose();
  };

  const handleGetAttributes = ({ sortBy, sortDir, searchText }: MetaProps) => {
    toggleSortDir();
    dispatch(fetchAttributes({ offset: 0, sortBy, sortDir, searchText }));
  };

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
          <DeleteButton
            handleDelete={(e) => {
              e?.preventDefault();
              e?.stopPropagation();
              setIsDeleteModalShown(true);
              setAttributeToDelete(attribute);
            }}
          />
        </td>
      </tr>
    );
  });

  // --- RENDER ---

  return (
    <>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th
              className={styles.cell}
              onClick={() =>
                handleGetAttributes({
                  sortBy: "name",
                  sortDir,
                })
              }
            >
              Name
            </th>
            <th className={styles.cell}>Labels</th>
            <th
              className={styles.cell}
              onClick={() =>
                handleGetAttributes({
                  sortBy: "createdAt",
                  sortDir,
                })
              }
            >
              Created At
            </th>
            <th className={styles.cell}>Delete</th>
          </tr>

          {attributesRows}
          <tr ref={containerRef}></tr>
        </tbody>
      </table>
      <ConfirmationModal
        handleClose={handleClose}
        handleConfirm={() => handleConfirmDelete(attributeToDelete)}
        isShown={isDeleteModalShown}
        label={`Are you sure you want to delete ${attributeToDelete?.name}?`}
      />
    </>
  );
};
