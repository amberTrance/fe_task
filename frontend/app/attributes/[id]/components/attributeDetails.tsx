"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import styles from "./attributeDetails.module.css";
import { BackButton } from "@/app/components/backButton/backButton";
import { DeleteButton } from "@/app/components/deleteButton";
import { mapAttributesLabelIdsToLabels } from "../../utils/helpers";
import { deleteAttributeApi } from "@/app/api/api";
import { ConfirmationModal } from "@/app/components/confirmationModal/confirmationModal";
import { deleteAttribute } from "@/app/store/features/attributes/attributesSlice";
import { useAppDispatch } from "@/app/store/hooks";

type AttributeDetailsProps = {
  attributeDetails: Attribute;
  id: string;
  labels: Labels;
};

export const AttributeDetails = ({
  attributeDetails,
  id,
  labels,
}: AttributeDetailsProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // --- STATE ---

  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

  // --- HELPERS ---

  const mappedlabels = mapAttributesLabelIdsToLabels({
    attribute: attributeDetails,
    labels: labels,
  });

  const handleClickDelete = () => {
    setIsDeleteModalShown(true);
  };

  const handleCloseDeleteModal = () => setIsDeleteModalShown(false);

  const handleConfirmDelete = async () => {
    try {
      await deleteAttributeApi({ id });

      dispatch(deleteAttribute({ id }));

      router.push("/attributes");
    } catch (error) {
      toast.error("Attribute couldn't be deleted. Try another time.");
    }

    handleCloseDeleteModal();
  };

  // --- RENDER ---

  return (
    <div>
      <section>
        <h1>{attributeDetails.name}</h1>

        <BackButton label="Go Back" />

        <div className={styles.container}>
          <p>{mappedlabels.join(", ")}</p>

          <DeleteButton handleDelete={handleClickDelete} />

          <ConfirmationModal
            handleClose={handleCloseDeleteModal}
            handleConfirm={handleConfirmDelete}
            isShown={isDeleteModalShown}
            label="Are you sure you want to delete?"
          />
        </div>
      </section>
    </div>
  );
};
