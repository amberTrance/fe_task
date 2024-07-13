type Attribute = {
  createdAt: string; // ISO8601
  deleted: boolean;
  id: string;
  labelIds: LabelId[];
  name: string;
};

type Attributes = {
  data: Attribute[];
  meta: {
    offset: number;
    limit: number;
    searchText: string;
    sortBy: "name" | "createdAt";
    sortDir: "asc" | "desc";
    hasNextPage: boolean;
  };
};

type LabelId = string;

type Label = {
  id: LabelId;
  name: string;
};
