type Attribute = {
  createdAt: string; // ISO8601
  deleted: boolean;
  id: string;
  labelIds: LabelId[];
  name: string;
};

type Attributes = {
  data: Attribute[],
  meta: "offset": 0,
    "limit": 10,
    "searchText": "",
    "sortBy": "name",
    "sortDir": "asc",
    "hasNextPage": true
}

type LabelId = string;

type Label = {
  id: LabelId;
  name: string;
};
