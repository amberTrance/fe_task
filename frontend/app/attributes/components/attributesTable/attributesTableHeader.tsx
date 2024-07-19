import { useState } from "react";

import { useAppDispatch } from "@/app/store/hooks";
import styles from "./attributesTable.module.css";
import { fetchAttributes } from "@/app/store/thunks";

type AttributesTableHeaderProps = {
  attributes: Attributes;
};

export const AttributesTableHeader = ({
  attributes,
}: AttributesTableHeaderProps) => {
  const dispatch = useAppDispatch();

  // --- STATE ---

  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // --- HELPERS ---

  const toggleSortDir = (sortBy: "name" | "createdAt") => {
    if (sortBy === attributes.meta.sortBy) {
      const sort = sortDir === "asc" ? "desc" : "asc";

      setSortDir(sort);

      return sort;
    }

    setSortDir("asc");

    return "asc";
  };

  const handleGetAttributes = ({ sortBy }: Pick<Meta, "sortBy">) => {
    const sort = toggleSortDir(sortBy);

    dispatch(fetchAttributes({ offset: 0, sortBy, sortDir: sort }));
  };

  // --- RENDER ---

  return (
    <tr>
      <th
        className={styles.cell}
        onClick={() =>
          handleGetAttributes({
            sortBy: "name",
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
          })
        }
      >
        Created At
      </th>

      <th className={styles.cell}>Delete</th>
    </tr>
  );
};
