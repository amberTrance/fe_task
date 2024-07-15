type MapAttributesLabelIdsToLabelsProps = {
  attribute: Attribute;
  labels: Labels;
};

export const mapAttributesLabelIdsToLabels = ({
  attribute,
  labels,
}: MapAttributesLabelIdsToLabelsProps) =>
  attribute.labelIds.map(
    (labelId) => labels.data.find((label) => label.id === labelId)?.name
  );
