import { getAttributesAndLabels } from "../api/api";
import { AttributesTable } from "./components/attributesTable";

import styles from "./page.module.css";

export default async function Attributes() {
  const { attributes, labels } = await getAttributesAndLabels({
    limit: 10,
    offset: 0,
  });

  // --- RENDER ---

  return (
    <main>
      <section>
        <h1 className={styles.heading}>Attributes</h1>

        {attributes && <AttributesTable attributes={attributes} />}
      </section>
    </main>
  );
}
