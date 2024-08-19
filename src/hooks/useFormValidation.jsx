import React, { useEffect, useState } from "react";

export const useFormValidation = (initialState, onSubmit, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [newData, setNewData] = useState({});
  const changeHandle = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Perform validation
    const validationErrors = validate({ ...formData, [name]: value });
    if (!validationErrors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    } else {
      setErrors({
        ...errors,
        [name]: validationErrors[name],
      });
    }
  };


  const handleSubmit = async (e) => {
  
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      
        const success = await onSubmit(formData); 
        if (success.status===200 || success.status===201) {
          console.log("Form submitted successfully!");
          setNewData({ ...formData });
          return true;
        }
        else if (success.status===406) {
          console.error("Form already submitted");
          return true;
        }
        else {
          console.error("Form submission failed.");
          return false;
        }
      
    } else {
      console.log("Form has validation errors.");
      return false; 
    }
  };
  
  
  
  function cleanup(){
    setFormData(initialState)
    setErrors({})
  }
  return {
    formData,
    errors,
    changeHandle,
    handleSubmit,
    cleanup,
    setFormData
  };
};
