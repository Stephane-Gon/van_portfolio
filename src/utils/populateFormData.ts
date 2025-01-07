const populateFormData = (data: Record<string, any>, ...moreData: Record<string, any>[]) => {
  const allData: Record<string, any> = { ...data, ...Object.assign({}, ...moreData) };

  const formData = new FormData();
  for (const key in allData) {
    if (!allData[key]) {
      formData.append(key, allData[key]);
    } else if (key === 'images') {
      const stringImages = allData[key].filter((image: string | File) => typeof image === 'string');
      const fileImages = allData[key].filter((image: string | File) => typeof image !== 'string');

      formData.append('stringImages', JSON.stringify(stringImages));
      fileImages.forEach((image: File, idx: number) => {
        formData.append(`fileImage_${idx}`, image);
      });
    } else if (data[key] instanceof Array) {
      formData.append(key, JSON.stringify(allData[key]));
    } else if (typeof data[key] === 'number') {
      formData.append(key, allData[key].toString());
    } else if (typeof data[key] === 'boolean') {
      formData.append(key, JSON.stringify(allData[key]));
    } else {
      formData.append(key, allData[key]);
    }
  }

  return formData;
};

export default populateFormData;
