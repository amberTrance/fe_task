import { getAllLabelsApi, getAttributeDetailsApi } from "@/app/api/api";
import { AttributeDetails } from "./components/attributeDetails";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const attributeDetails = await getAttributeDetailsApi({
    id,
  });

  const labels = await getAllLabelsApi();

  // --- RENDER ---

  return (
    <AttributeDetails
      attributeDetails={attributeDetails.data}
      id={id}
      labels={labels}
    />
  );
}
