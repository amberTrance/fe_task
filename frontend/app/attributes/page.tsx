import styles from "./page.module.css";
import { getAttributesApi, getAllLabelsApi } from "../api/api";
import { AttributesSearch } from "./components/attributesSearch/attributesSearch";
import { AttributesTable } from "./components/attributesTable/attributesTable";

export default async function Attributes() {
  const attributes = await getAttributesApi({
    offset: 0,
  });

  const labels = await getAllLabelsApi();

  // --- RENDER ---

  return (
    <main>
      <section>
        <h1 className={styles.heading}>Attributes</h1>

        <AttributesSearch />

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
