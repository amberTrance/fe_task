import { useRouter } from "next/navigation";

import { mapAttributesLabelIdsToLabels } from "../../utils/helpers";
import { AttributesTableRow } from "./attributesTableRow";

type AttributesTableRowProps = {
  attributes: Attributes;
  handleDelete: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => (attribute: Pick<Attribute, "id" | "name">) => void;
  labelsServer: Labels;
};

export const AttributesTableRows = ({
  attributes,
  labelsServer,
  handleDelete,
}: AttributesTableRowProps) => {
  const router = useRouter();

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
      />
    );
  });

  // --- RENDER ---

  return attributesRows;
};
