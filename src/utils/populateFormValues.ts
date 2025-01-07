const populateFormValues = <T extends Record<string, any>>(item: T, id: number | null) => {
  const isEdit = id && Boolean(item);

  const defaultValues: Record<string, any> = {};

  Object.entries(item).forEach(([key, value]) => {
    if (typeof value === 'string') {
      defaultValues[key] = isEdit ? value : '';
    } else if (typeof value === 'number') {
      defaultValues[key] = isEdit ? value : 0;
    } else if (Array.isArray(value)) {
      defaultValues[key] = isEdit ? value : [];
    } else if (typeof value === 'boolean') {
      defaultValues[key] = isEdit ? value : false;
    } else if (typeof value === 'object') {
      defaultValues[key] = isEdit ? value : {};
    }
  });

  return defaultValues;
};

export default populateFormValues;
