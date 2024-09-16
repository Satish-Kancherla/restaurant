export const validate1 = (values) => {
  const errors = {};
 
  if (!values.category.trim()) {
    errors.category = "Category is required";
  }

  if (!values.itemname) {
    errors.itemname = "Name is required";
  }
 
  // if (!values.notes.trim()) {
  //   errors.notes = "Note is required";
  // }

  if (!values.quantity.trim()) {
    errors.quantity = "Quantity is required";
  }
  //Validation For empNo
  if (!values.itemname) {
    errors.itemname = "Name is required";
  }

  return errors;
};















export const validate2 = (values) => {
  const errors = {};
  // if (!values.grade.trim()) {
  //   errors.grade = "Please select an option";
  // }
  // if (!values.costCenter.trim()) {
  //   errors.costCenter = "Please select an option";
  // }
  // console.log(values.locationId);
  // if (!values.locationId.trim()) {
  //   errors.locationId = "Please select an option";
  // }
  if (!values.locationId) {
    errors.locationId = "Please select an option";
  }
  if (!values.designationId) {
    errors.designationId = "Please select an option";
  }
  if (!values.divisionId) {
    errors.divisionId = "Please select an option";
  }
  if (!values.departmentId) {
    errors.departmentId = "Please select an option";
  }
  if (!values.projectId) {
    errors.projectId = "Please select an option";
  }
   if (!values.projectDate.trim()) {
    errors.projectDate = "Project Allocation Date is required";
  }
  if (!values.shiftId) {
    errors.shiftId = "Please select an option";
  }
  if (!values.isBillable) {
    errors.isBillable = "Please select an option";
  }
  
  return errors;
};










export const validate3 = (values) => {
  const errors = {};
  // PAN card number validation
  if (!values.panNo.trim()) {
    errors.panNo = "PAN card number is required";
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(values.panNo)) {
    errors.panNo = "Invalid PAN card number";
  }
  // validation For aadharNo
  if (!values.aadharNo.trim()) {
    errors.aadharNo = "Aadhar number is required";
  } else if (!/^\d{12}$/.test(values.aadharNo)) {
    errors.aadharNo = "Invalid Aadhar number";
  }
 // validation For uanNo
  if (!values.uanNo.trim()) {
    errors.uanNo = "UAN number is required";
  } else if (!/^\d{12}$/.test(values.uanNo)) {
    errors.uanNo = "Invalid UAN number";
  }

  // Passport number validation
  // if (!values.passportNo.trim()) {
  //   errors.passportNo = "Passport number is required";
  // } else if (!/^[a-zA-Z0-9]{6,15}$/.test(values.passportNo)) {
  //   errors.passportNo = "Invalid passport number";
  // }
  return errors;
};










export const validate4 = (values) => {
  const errors = {};
  if (!values.paymentType.trim()) {
    errors.paymentType = "Please select an option";
  }


   // validation For bankName
   if (!values.bankName.trim()) {
    errors.bankName = "Bank Name is required";
  } 


   // validation For bankAccountNo
   if (!values.accountNumber.trim()) {
    errors.accountNumber = "Bank Account Number is required";
  } else if (!/^\d{9,12}$/.test(values.accountNumber)) {
    errors.accountNumber = "Invalid Bank Account Number";
  }

   // validation For accHolderName
   if (!values.accHolderName.trim()) {
    errors.accHolderName = "Account Holder Name is required";
  } 

   // validation For ifscCode
   if (!values.ifscCode.trim()) {
    errors.ifscCode = "IFSC Code is required";
  } else if (!/^[A-Za-z]{4}[0][A-Za-z0-9]{6}$/.test(values.ifscCode)) {
    errors.ifscCode = "Invalid IFSC Code";
  }

    // validation For branchName
    if (!values.branchName.trim()) {
      errors.branchName = "branch Name is required";
    } 

  return errors;
};
