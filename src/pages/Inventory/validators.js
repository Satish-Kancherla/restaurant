export const validateDialog = (values) => {
  const errors = {};
  if (!values.itemname.trim()) {
    errors.itemname = "Item Name is required";
  }
  if (!values.unitofmeasure) {
    errors.unitofmeasure = "Unit Of Measure is required";
  } 
   if (!values.availablestock.trim()) {
    errors.availablestock = "Available Stock is required";
  }
  if (!values.reorderlevel) {
    errors.reorderlevel = "Reorder Level is required";
  }
  return errors;
};
