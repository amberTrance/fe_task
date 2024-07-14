import { getAttributes, getAllLabels } from "../api/api";
import { AttributesTable } from "./components/attributesTable";

import styles from "./page.module.css";

export default async function Attributes() {
  const attributes = await getAttributes({
    offset: 0,
  });

  const labels = await getAllLabels();

  // --- RENDER ---

  return (
    <main>
      <section>
        <h1 className={styles.heading}>Attributes</h1>

        {attributes && (
          <AttributesTable
            attributesServer={attributes}
            labelsServer={labels}
          />
        )}
      </section>
    </main>
  );
}
