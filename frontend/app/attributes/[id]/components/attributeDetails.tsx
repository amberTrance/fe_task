"use client";

import { BackButton } from "@/app/components/backButton/backButton";
import { DeleteButton } from "@/app/components/deleteButton";
import { mapAttributesLabelIdsToLabels } from "../../utils/helpers";

import styles from "./attributeDetails.module.css";

type AttributeDetailsProps = {
  attributeDetails: Attribute;
  labels: Labels;
};

export const AttributeDetails = ({
  attributeDetails,
  labels,
}: AttributeDetailsProps) => {
  const mappedlabels = mapAttributesLabelIdsToLabels({
    attribute: attributeDetails,
    labels: labels,
  });

  // --- CALLBACKS ---

  const handleDelete = () => {};

  // --- RENDER ---

  return (
    <div>
      <section>
        <h1>{attributeDetails.name}</h1>

        <BackButton label="Go Back" />

        <div className={styles.container}>
          <p>{mappedlabels.join(", ")}</p>

          <DeleteButton handleDelete={handleDelete} />
        </div>
      </section>
    </div>
  );
};
