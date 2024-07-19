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
      setSortDir((sortDir) => (sortDir === "asc" ? "desc" : "asc"));

      return;
    }

    setSortDir("asc");
  };

  const handleGetAttributes = ({
    sortBy,
    sortDir,
    searchText,
  }: Omit<Meta, "hasNextPage" | "offset" | "limit">) => {
    toggleSortDir(sortBy);

    dispatch(fetchAttributes({ offset: 0, sortBy, sortDir, searchText }));
  };

  // --- RENDER ---

  return (
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
  );
};
