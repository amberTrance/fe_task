import { useRouter } from "next/navigation";

import styles from "./attributesTable.module.css";
import { mapAttributesLabelIdsToLabels } from "../../utils/helpers";
import { DeleteButton } from "@/app/components/deleteButton";

type AttributesTableRowProps = {
  attributes: Attributes;
  labelsServer: Labels;
  handleDelete: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => (attribute: Attribute) => void;
};

export const AttributesTableRow = ({
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
      <tr
        key={attribute.name}
        onClick={() => router.push(`/attributes/${attribute.id}`)}
      >
        <td className={styles.cell}>{attribute.name}</td>

        <td className={styles.cell}>{labels.join(", ")}</td>

        <td className={styles.cell}>{attribute.createdAt}</td>

        <td className={styles.cell}>
          <DeleteButton
            handleDelete={(event) => handleDelete(event)(attribute)}
          />
        </td>
      </tr>
    );
  });

  // --- RENDER ---

  return attributesRows;
};
