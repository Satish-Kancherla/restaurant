import React from "react";
import * as FormElements from "../../components/ui/FormElements";
import { useFormValidation } from "../../hooks/useFormValidation";
export default function Payment({form}) {
  const {formData, errors, changeHandle, handleSubmit } = form
  return (
    <div>
      <div className="employee-form" >
        <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
          <FormElements.Select
            label={<span>Payment Type <span className="text-red-500">*</span></span>}
            optionsArray={[
              { id: "", name: "Select an Option" },
              { id: "Bank", name: "Bank" },
              
            ]}
            name="paymentType"
            value={formData.paymentType}
            onChange={changeHandle}
             error={errors.paymentType}
          />
         <FormElements.Input
            label={<span>Bank Name <span className="text-red-500">*</span></span>}
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={changeHandle}
             error={errors.bankName}
          />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
          <FormElements.Input
            label={<span>Bank Account Number <span className="text-red-500">*</span></span>}
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={changeHandle}
             error={errors.accountNumber}
          />
          <FormElements.Input
            label={<span>Account Holder Name<span className="text-red-500">*</span></span>}
            type="text"
            name="accHolderName"
            value={formData.accHolderName}
            onChange={changeHandle}
             error={errors.accHolderName}
          />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
          <FormElements.Input
            label={<span>IFSC Code <span className="text-red-500">*</span></span>}
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={changeHandle}
             error={errors.ifscCode}
          />
          <FormElements.Input
            label={<span>Branch Name <span className="text-red-500">*</span></span>}
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={changeHandle}
             error={errors.branchName}
          />
        </div>
      </div>
    </div>
  );
}
