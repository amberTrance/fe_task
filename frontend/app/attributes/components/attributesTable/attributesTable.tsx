"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "./attributesTable.module.css";
import {
  addAttributes,
  deleteAttribute,
} from "@/app/store/features/attributes/attributesSlice";
import { fetchAttributes } from "@/app/store/thunks";
import { mapAttributesLabelIdsToLabels } from "../../utils/helpers";
import { DeleteButton } from "@/app/components/deleteButton";
import { deleteAttributeApi } from "@/app/api/api";
import { ConfirmationModal } from "@/app/components/confirmationModal/confirmationModal";
import { useAppDispatch } from "@/app/store/hooks";
import { selectAttributes } from "@/app/store/features/attributes/attributesSelectors";

type AttributesTableProps = {
  attributesServer: Attributes;
  labelsServer: Labels;
};

export const AttributesTable = ({
  attributesServer,
  labelsServer,
}: AttributesTableProps) => {
  const containerRef = useRef<HTMLTableRowElement | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const attributes = useSelector(selectAttributes);

  // --- INITIATE REDUX ---

  if (isEmpty(attributes.data)) {
    dispatch(addAttributes(attributesServer));
  }

  // --- STATE ---

  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [attributeToDelete, setAttributeToDelete] = useState<
    undefined | Attribute
  >();
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

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

  // --- HELPERS ---

  const toggleSortDir = (sortBy: "name" | "createdAt") => {
    if (sortBy === attributes.meta.sortBy) {
      setSortDir((sortDir) => (sortDir === "asc" ? "desc" : "asc"));

      return;
    }

    setSortDir("asc");
  };

  const handleCloseModal = () => setIsDeleteModalShown(false);

  const handleConfirmDelete = async () => {
    if (!attributeToDelete) {
      return;
    }

    const { id, name } = attributeToDelete;

    try {
      await deleteAttributeApi({ id });

      dispatch(deleteAttribute({ id }));

      toast.success(`${name} was successfully deleted.`);
    } catch (error) {
      toast.error(`${name} couldn't be deleted. Try another time.`, {
        isLoading: false,
      });
    }

    handleCloseModal();
  };

  const handleGetAttributes = ({
    sortBy,
    sortDir,
    searchText,
  }: Omit<Meta, "hasNextPage" | "offset" | "limit">) => {
    toggleSortDir(sortBy);

    dispatch(fetchAttributes({ offset: 0, sortBy, sortDir, searchText }));
  };

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
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
        isShown={isDeleteModalShown}
        label={`Are you sure you want to delete ${attributeToDelete?.name}?`}
      />
    </>
  );
};
