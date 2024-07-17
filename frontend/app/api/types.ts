type Attribute = {
  createdAt: string; // ISO8601
  deleted: boolean;
  id: string;
  labelIds: LabelId[];
  name: string;
};

type AttributeDetails = {
  data: Attribute;
};

type Attributes = {
  data: Attribute[];
  meta: Meta;
};

type LabelId = string;

type Label = {
  id: LabelId;
  name: string;
};

type Labels = {
  data: Label[];
  meta: Pick<Meta, "offset" | "limit" | "hasNextPage">;
};

type Meta = {
  offset: number;
  limit: number;
  hasNextPage: boolean;
  sortBy: "name" | "createdAt";
  sortDir: "asc" | "desc";
  searchText?: string;
};
