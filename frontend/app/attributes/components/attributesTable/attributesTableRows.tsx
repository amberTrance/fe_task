import { memo } from "react";

import { mapAttributesLabelIdsToLabels } from "../../utils/helpers";
import { AttributesTableRow } from "./attributesTableRow";

type AttributesTableRowProps = {
  attributes: Attributes;
  attributeToDelete: Pick<Attribute, "id" | "name"> | null;
  handleDelete: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => (attribute: Pick<Attribute, "id" | "name">) => void;
  isDeleting: boolean;
  labelsServer: Labels;
};

// eslint-disable-next-line react/display-name
export const AttributesTableRows = memo(
  ({
    attributes,
    attributeToDelete,
    isDeleting,
    labelsServer,
    handleDelete,
  }: AttributesTableRowProps) => {
    // --- HELPERS ---

    const attributesRows = attributes.data.map((attribute) => {
      const labels = mapAttributesLabelIdsToLabels({
        attribute,
        labels: labelsServer,
      });

      return (
        <AttributesTableRow
          createdAt={attribute.createdAt}
          handleDelete={handleDelete}
          id={attribute.id}
          labels={labels.join(", ")}
          name={attribute.name}
          key={attribute.name}
          isDeleting={isDeleting && attribute.name === attributeToDelete?.name}
        />
      );
    });

    // --- RENDER ---

    return attributesRows;
  }
);
