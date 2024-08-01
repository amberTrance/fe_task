import { LoadingSkelleton } from "@/app/components/loading/loadingSkelleton";
import styles from "./attributesTable.module.css";

export const AttributesTableRowSkeleton = () => (
  <tr>
    <td className={styles.cell}>
      <LoadingSkelleton style="text" />
    </td>

    <td className={styles.cell}>
      <LoadingSkelleton style="text" />
    </td>

    <td className={styles.cell}>
      <LoadingSkelleton style="text" />
    </td>

    <td className={styles.cell}>
      <LoadingSkelleton style="icon" />
    </td>
  </tr>
);
