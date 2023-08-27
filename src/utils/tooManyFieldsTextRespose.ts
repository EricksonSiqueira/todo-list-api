export const tooManyFieldsTextRespose = <T>(
  receivedFields: T,
  requiredFields: string[]
) => {
  const receivedFieldsArray = Object.keys(receivedFields);
  const leftOverFields = receivedFieldsArray.filter(
    (receivedField) => !requiredFields.includes(receivedField)
  );

  if (!leftOverFields.length) {
    return '';
  }

  return `Left over fields: ${leftOverFields.join(', ')}`;
};
