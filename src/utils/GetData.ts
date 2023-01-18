export const getFormData = (target: any) => {
    const formData = {};
    if (target) {
      target.forEach((item: HTMLInputElement) => {
        if (['INPUT', "TEXTAREA"].includes(item.nodeName)) {
          if (item.name && formData) {
            formData[item.name] = item.value;
          }
        }
      });
    }
    return formData;
  };