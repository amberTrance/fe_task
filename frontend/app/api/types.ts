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
    searchText: string;
    sortBy: "name" | "createdAt";
    sortDir: "asc" | "desc";
  } & PageProps;
};

type PageProps = {
  offset: number;
  limit: number;
  hasNextPage: boolean;
};

type LabelId = string;

type Label = {
  id: LabelId;
  name: string;
};

type Labels = {
  data: Label[];
  meta: PageProps;
};
