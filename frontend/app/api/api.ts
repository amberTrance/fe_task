type MetaProps = {
  offset: number;
};

export const getAttributes = async ({
  offset,
}: MetaProps): Promise<Attributes> => {
  const url = new URL("http://localhost:3000/attributes");

  url.searchParams.set("offset", String(offset));

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch attributes.");
  }

  const result = await response.json();

  return result;
};

export const getAttributeDetails = async ({
  id,
}: {
  id: string;
}): Promise<AttributeDetails> => {
  const url = new URL(`http://localhost:3000/attributes/${id}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch attributes.");
  }

  const result = await response.json();

  return result;
};

export const getAllLabels = async (): Promise<Labels> => {
  let offset = 0;
  let allLabels: Labels = {
    data: [],
    meta: { offset: 0, limit: 10, hasNextPage: true },
  };
  let hasNextPage = true;

  const url = new URL("http://localhost:3000/labels");

  do {
    url.searchParams.set("offset", String(offset));

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch attributes.");
    }

    const result = await response.json();

    allLabels.data.push(...result.data);
    allLabels.meta = result.meta;
    hasNextPage = result.meta.hasNextPage;

    offset = offset + 10;
  } while (hasNextPage);

  return allLabels;
};
