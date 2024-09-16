export const validateDialog = (values) => {
  const errors = {};

  if (!values.itemname.trim()) {
    errors.itemname = " Item Name is required";
  } 
   if (!values.type.trim()) {
    errors.type = "Type is required";
  }

  // if (!values.image) {
  //   errors.image = "Image is required";
  // }

  if (!values.price.trim()) {
    errors.price = " Price is required";
  } 
   if (!values.status.trim()) {
    errors.status = "Status is required";
  }
  return errors;
};
