import { useRouter } from "next/navigation";
import { memo } from "react";

import styles from "./attributesTable.module.css";
import { DeleteButton } from "@/app/components/deleteButton";

type AttributesTableRowProps = {
  createdAt: string;
  handleDelete: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => (attribute: Pick<Attribute, "id" | "name">) => void;
  id: string;
  labels: string;
  name: string;
};

export const AttributesTableRow = memo(
  ({ createdAt, handleDelete, id, labels, name }: AttributesTableRowProps) => {
    const router = useRouter();

    return (
      <tr key={name} onClick={() => router.push(`/attributes/${id}`)}>
        <td className={styles.cell}>{name}</td>

        <td className={styles.cell}>{labels}</td>

        <td className={styles.cell}>{createdAt}</td>

        <td className={styles.cell}>
          <DeleteButton
            handleDelete={(event) => handleDelete(event)({ name, id })}
          />
        </td>
      </tr>
    );
  }
);
