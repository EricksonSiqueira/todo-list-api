export const getFormattedUpdateColumns = (object: any) =>
  Object.keys(object)
    .map((key) => `${key} = ?`)
    .join(', ');
