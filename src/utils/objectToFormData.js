const objectToFormData = (object) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(object)) {
    formData.append(key, value);
  }

  return formData;
};
export default objectToFormData;
