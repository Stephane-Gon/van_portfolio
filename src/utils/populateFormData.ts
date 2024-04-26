const populateFormData = (data: Record<string, any>, ...moreData: Record<string, any>[]) => {
  const allData: Record<string, any> = { ...data, ...Object.assign({}, ...moreData) };

  const formData = new FormData();
  for (const key in allData) {
    if (!allData[key]) {
      formData.append(key, allData[key]);
    } else if (data[key] instanceof Array) {
      formData.append(key, allData[key].join(','));
    } else if (typeof data[key] === 'number') {
      formData.append(key, allData[key].toString());
    } else {
      formData.append(key, allData[key]);
    }
  }

  return formData;
};

export default populateFormData;
