type MetaProps = {
  offset: number;
  sortBy?: "name" | "createdAt";
  sortDir?: "asc" | "desc";
  searchText?: string;
};

export const getAttributesApi = async ({
  offset,
  sortBy,
  sortDir,
  searchText,
}: MetaProps): Promise<Attributes> => {
  const url = new URL("http://localhost:3000/attributes");

  url.searchParams.set("offset", String(offset));

  if (sortBy) {
    url.searchParams.set("sortBy", String(sortBy));
  }
  if (sortDir) {
    url.searchParams.set("sortDir", String(sortDir));
  }
  if (searchText) {
    url.searchParams.set("searchText", String(searchText));
  }

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch attributes.");
  }

  const result = await response.json();

  return result;
};

export const getAttributeDetailsApi = async ({
  id,
}: {
  id: string;
}): Promise<AttributeDetails> => {
  const url = new URL(`http://localhost:3000/attributes/${id}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch attribute.");
  }

  const result = await response.json();

  return result;
};

export const deleteAttributeApi = async ({
  id,
}: {
  id: string;
}): Promise<AttributeDetails> => {
  const url = new URL(`http://localhost:3000/attributes/${id}`);

  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete label.");
  }

  const result = await response.json();

  return result;
};

export const getAllLabelsApi = async (): Promise<Labels> => {
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
      throw new Error("Failed to fetch labels.");
    }

    const result = await response.json();

    allLabels.data.push(...result.data);
    allLabels.meta = result.meta;
    hasNextPage = result.meta.hasNextPage;

    offset = offset + 10;
  } while (hasNextPage);

  return allLabels;
};
