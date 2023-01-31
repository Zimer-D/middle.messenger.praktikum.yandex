export const getFormData = (target: any) => {
  const formData = {} as any;
  if (target) {
    target.forEach((item: HTMLInputElement) => {
      if (["INPUT", "TEXTAREA"].includes(item.nodeName)) {
        if (item.name && formData) {
          formData[item.name as any] = item.value as any;
        }
      }
    });
  }
  return formData;
};
