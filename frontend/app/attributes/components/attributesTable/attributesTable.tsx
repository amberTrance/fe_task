"use client";

import { useCallback, useState } from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "./attributesTable.module.css";
import {
  addAttributes,
  deleteAttribute,
} from "@/app/store/features/attributes/attributesSlice";
import { deleteAttributeApi } from "@/app/api/api";
import { ConfirmationModal } from "@/app/components/confirmationModal/confirmationModal";
import { useAppDispatch } from "@/app/store/hooks";
import { selectAttributes } from "@/app/store/features/attributes/attributesSelectors";
import { AttributesTableRows } from "./attributesTableRows";
import { AttributesTableHeader } from "./attributesTableHeader";
import { AttributesTableRowRef } from "./attributesTableRowRef";

type AttributesTableProps = {
  attributesServer: Attributes;
  labelsServer: Labels;
};

export const AttributesTable = ({
  attributesServer,
  labelsServer,
}: AttributesTableProps) => {
  const dispatch = useAppDispatch();
  const attributes = useSelector(selectAttributes);

  // --- INITIATE REDUX ---

  if (isEmpty(attributes.data) && isEmpty(attributes.meta.searchText)) {
    dispatch(addAttributes(attributesServer));
  }

  // --- STATE ---

  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [attributeToDelete, setAttributeToDelete] = useState<null | Pick<
    Attribute,
    "id" | "name"
  >>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- HELPERS ---

  const handleCloseModal = () => setIsDeleteModalShown(false);

  const handleConfirmDelete = async () => {
    if (!attributeToDelete) {
      return;
    }

    const { id, name } = attributeToDelete;

    try {
      setIsDeleting(true);

      handleCloseModal();

      await deleteAttributeApi({ id });

      dispatch(deleteAttribute({ id }));

      toast.success(`${name} was successfully deleted.`);
    } catch (error) {
      toast.error(`${name} couldn't be deleted. Try another time.`, {
        isLoading: false,
      });
    }

    setIsDeleting(false);

    setAttributeToDelete(null);
  };

  const handleDeleteAttribute = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
      (attribute: Pick<Attribute, "id" | "name">) => {
        event?.preventDefault();
        event?.stopPropagation();

        setIsDeleteModalShown(true);
        setAttributeToDelete(attribute);
      },
    []
  );

  // --- RENDER ---

  return (
    <>
      <table className={styles.table}>
        <tbody>
          <AttributesTableHeader attributes={attributes} />

          <AttributesTableRows
            attributes={attributes}
            attributeToDelete={attributeToDelete}
            isDeleting={isDeleting}
            handleDelete={handleDeleteAttribute}
            labelsServer={labelsServer}
          />

          <AttributesTableRowRef attributes={attributes} />
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
