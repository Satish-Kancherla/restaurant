export const statusValidate= (values) => {
    const errors = {}
    if (!values.empStatus.trim()) {
        errors.empStatus = "Employee Status is required";
    }
    return errors;
  };
  