export const validateDialog = (values) => {
  const errors = {};
  //Validation For name
  if (!values.fname.trim()) {
    errors.fname = "First Name is required";
  } else if (values.fname.length < 3) {
    errors.fname = "First Name must be at least 3 characters long";
  }
  if (!values.lname.trim()) {
    errors.lname = "Last Name is required";
  } else if (values.lname.length < 3) {
    errors.lname = "Last Name must be at least 3 characters long";
  }
  //Validation For project
  if (!values.projectId) {
    errors.projectId = "Project name is required";
  } else if (values.projectId.length < 3) {
    errors.projectId = "Name must be at least 3 characters long";
  }
   //Validation For projectDate
   if (!values.projectDate.trim()) {
    errors.projectDate = "Date is required";
  }
  //Validation For billType
  if (!values.isBillable) {
    errors.isBillable = "Billing Type is required";
  }
  return errors;
};
