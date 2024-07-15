import { getAllLabels, getAttributeDetails } from "@/app/api/api";
import { AttributeDetails } from "./components/attributeDetails";

export default async function Page({ params }: { params: { id: string } }) {
  const attributeDetails = await getAttributeDetails({
    id: params.id,
  });

  const labels = await getAllLabels();

  // --- RENDER ---

  return (
    <AttributeDetails
      attributeDetails={attributeDetails.data}
      labels={labels}
    />
  );
}
