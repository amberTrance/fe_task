type FetchAttributesProps = {
  limit: number;
  offset: number;
};

export const getAttributes = async ({
  limit,
  offset,
}: FetchAttributesProps): Promise<Attributes> => {
  const url = new URL("http://localhost:3000/attributes");

  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch attributes.");
  }

  const result = await response.json();

  return result;
};

export const getLabels = async (): Promise<Label[]> => {
  const res = await fetch("http://localhost:3000/labels");

  if (!res.ok) {
    throw new Error("Failed to fetch labels.");
  }

  return res.json();
};

export const getAttributesAndLabels = async ({
  limit,
  offset,
}: FetchAttributesProps) => {
  const attributes = await getAttributes({ limit, offset });
  const labels = await getLabels();

  return { attributes, labels };
};
