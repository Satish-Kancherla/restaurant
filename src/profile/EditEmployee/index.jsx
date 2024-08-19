import React, { useState, useEffect } from "react";
import { instance } from "../../components/Url";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import Button from "../../components/ui/Button";
import * as FormElements from "../../components/ui/FormElements";
// import emailjs from '@emailjs/browser';

export default function EditEmployee() {
  const { user } = useAuthContext();
  const [empData, setEmpData] = useState(null);
  const [formData, setFormData] = useState({
    dob: "",
    mobileNo: "",
    emergencyMobileNo: "",
    emergencyName: "",
    salary: "",
    status: "",
    designation: "",
    location: "",
    division: "",
    department: "",
    project: "",
    projectDate: "",
    shift: "",
    isBillable: "",
    empStatus: "",
    panNo: "",
    aadharNo: "",
    passportNo: "",
    uanNo: "",
    paymentType: "",
    bankName: "",
    accountNumber: "",
    accHolderName: "",
    ifscCode: "",
    branchName: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInfo() {
      try {
        const response = await instance.get("/api/v1/auth/userempinfo");
        const data = response.data;
        setEmpData(data);
        setFormData({
          dob: data.empBasicInfo.dob || "",
          mobileNo: data.empBasicInfo.mobileNo || "",
          emergencyMobileNo: data.empBasicInfo.emergencyMobileNo || "",
          emergencyName: data.empBasicInfo.emergencyName || "",
          salary: data.empBasicInfo.salary || "",
          status: data.empBasicInfo.status || "",
          designation: data.empPosition.designation?.name || "",
          location: data.empPosition.location?.name || "",
          division: data.empPosition.division?.name || "",
          department: data.empPosition.department?.name || "",
          project: data.empPosition.project?.name || "",
          projectDate: data.empPosition.projectDate || "",
          shift: data.empPosition.shift?.name || "",
          isBillable: data.empPosition.isBillable ? "Billable" : "Non Billable",
          empStatus: data.empPosition.empStatus?.name || "",
          panNo: data.empStatutory.panNo || "",
          aadharNo: data.empStatutory.aadharNo || "",
          passportNo: data.empStatutory.passportNo || "",
          uanNo: data.empStatutory.uanNo || "",
          paymentType: data.empPayment.paymentType || "",
          bankName: data.empPayment.bankName || "",
          accountNumber: data.empPayment.accountNumber || "",
          accHolderName: data.empPayment.accHolderName || "",
          ifscCode: data.empPayment.ifscCode || "",
          branchName: data.empPayment.branchName || "",
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch employee information.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchInfo();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.put(
        "/api/v1/auth/updateempinfo",
        { ...formData }
      );
      toast.success("Employee information updated successfully!");
      // Navigate programmatically using Link component
      // history.push("/settings");     

      // const serviceId = '';
      // const templateId = '';
      // const publicKey = '';
  
      // const templateParams = {
      //   from_name: employee,
      //   to_name: 'Admin',
  
      // };
  
      // emailjs.send(serviceId, templateId, templateParams, publicKey)
      //   .then((response) => {
      //     console.log('Email sent successfully!', response);
      //     toast.success("You update request sent to the admin");
      //   })
      //   .catch((error) => {
      //     console.error('Error sending email:', error);
      //   });
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to update employee information.");
    }
  };
  

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="block tracking-wide text-zinc-600 text-2xl font-bold mr-2 ">
        Update Your Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="section my-5 ">
          <h3 className="text-xl font-semibold mb-2 text-zinc-600">
            Personal Info
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
            <div>
              <FormElements.Input
                label="Date of Birth"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Mobile No"
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Emergency Mobile No"
                type="text"
                name="emergencyMobileNo"
                value={formData.emergencyMobileNo}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Emergency Name"
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Salary"
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Status"
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
          </div>
        </div>

        <div className="section ">
          <h3 className="text-xl font-semibold text-zinc-600 mb-2">
            Employee Position
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
            <div>
              <FormElements.Input
                label="Designation"
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Division"
                type="text"
                name="division"
                value={formData.division}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Department"
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Project"
                type="text"
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Project Allocation Date"
                type="date"
                name="projectDate"
                value={formData.projectDate}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Attendance Shift"
                type="text"
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
              <FormElements.Select
                optionsArray={[
                  { id: "", title: "Select an Option" },
                  { value: "Billable", title: "Billable" },
                  { value: "Non Billable", title: "Non Billable" },
                ]}
                label="Project Type"
                name="isBillable"
                value={formData.isBillable}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Employee Status"
                type="text"
                name="empStatus"
                value={formData.empStatus}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
          </div>
        </div>

        <div className="section my-5">
          <h3 className="text-xl font-semibold text-zinc-600 mb-2">
            Statutory Info
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
            <div>
              <FormElements.Input
                label="PAN No"
                type="text"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Aadhar No"
                type="text"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Passport No"
                type="text"
                name="passportNo"
                value={formData.passportNo}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="UAN No"
                type="text"
                name="uanNo"
                value={formData.uanNo}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
          </div>
        </div>

        <div className="section mb-5">
          <h3 className="text-xl font-semibold mb-2 text-zinc-600">
            Payment Info
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
            <div>
              <FormElements.Input
                label="Payment Type"
                type="text"
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Bank Name"
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Account Number"
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Account Holder Name"
                type="text"
                name="accHolderName"
                value={formData.accHolderName}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="IFSC Code"
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
            <div>
              <FormElements.Input
                label="Branch Name"
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                className="w-full  px-2 py-1"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
        <Button type="submit">Update Information</Button>
        <Button ><NavLink to="/profile/settings">Go to Settings</NavLink></Button>
        </div>
      </form>
    </div>
  );
}
