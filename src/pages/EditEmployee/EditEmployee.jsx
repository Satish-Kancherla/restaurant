import React, { useLayoutEffect, useState } from "react";
import EmployeeDetails from "../AddEmployee/EmployeeDetails";
import Button from "../../components/ui/Button";
import Statutoryinfo from "../AddEmployee/Statutoryinfo";
import Payment from "../AddEmployee/Payment";
import Employeeposition from "../AddEmployee/Employeeposition";
import { useFormValidation } from "../../hooks/useFormValidation";
import { validate1 } from "../AddEmployee/validators";
import { validate2 } from "../AddEmployee/validators";
import { validate3 } from "../AddEmployee/validators";
import { validate4 } from "../AddEmployee/validators";
import { getUrl, instance } from "../../components/Url";
import axios from "axios";
import Loading from "../../components/ui/Loading";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
export default function EditEmployee() {
    const { state } = useLocation();
    const { user } = useAuthContext();
    const url = getUrl();
    const [empData, setEmpData] = useState();

    const form1 = useFormValidation(
        {
            empSeries: "",
            probationPeriod: "",
            empNo: "",
            confirmDate: "",
            fname: "",
            lname: "",
            email: "",
            dob: "",
            mobileNo: "",
            aadharNo: "",
            emergencyName: "",
            gender: "",
            emergencyNo: "",
            reportingMgId: "",
            fathersName: "",
            status: "",
            spouseName: "",
            doj: "",
            salary: "",
        },
        async (values) => {
            console.log("values", values);

            return new Promise(async (resolve, reject) => {
                const endpoint = `/api/v1/emp/editemployee/empbasicinfo/${state.empNo}`;
                try {
                    await instance
                        .put(endpoint, values)
                        .then((data) => {
                            toast.success("Employee Basic Info Updated Successfully");
                            // setForm1Success(true);
                            resolve(data); // Resolve the Promise with true if successful
                        })
                        .catch(async (error) => {
                            resolve(error); // Resolve the Promise with true if successful
                        });
                } catch (error) {
                    toast.error("Server Error");
                    console.error("Error:", error);
                    reject(false);
                }
            });
        },
        validate1
    );
    const form2 = useFormValidation(
        {
            empNo: "",
            grade: "",
            costCenter: "",
            designationId: "",
            locationId: "",
            divisionId: "",
            departmentId: "",
            projectId: "",
            projectDate: "",
            shiftId: "",
            isBillable: "",
            empStatusId: "",
        },
        (values) => {
            return new Promise(async (resolve, reject) => {
                const endpoint = `/api/v1/emp/editemployee/empposition/${state.empNo}`;
                try {
                    await instance
                        .put(endpoint, values)
                        .then((data) => {
                            toast.success("Employee Position Info Updated Successfully");
                            // setForm1Success(true);
                            resolve(data); // Resolve the Promise with true if successful
                        })
                        .catch(async (error) => {
                            resolve(error); // Resolve the Promise with true if successful
                        });
                } catch (error) {
                    toast.error("Server Error");
                    console.error("Error:", error);
                    reject(false);
                }
            });
        },
        validate2
    );
    const form3 = useFormValidation(
        {
            empNo: "",
            panNo: "",
            aadharNo: "",
            passportNo: "",
            uanNo: "",
        },
        (values) => {
            return new Promise(async (resolve, reject) => {
                const endpoint = `/api/v1/emp/editemployee/empstatutory/${state.empNo}`;
                try {
                    await instance
                        .put(endpoint, values)
                        .then((data) => {
                            toast.success("Employee Statutory Info Updated Successfully");
                            // setForm1Success(true);
                            resolve(data); // Resolve the Promise with true if successful
                        })
                        .catch(async (error) => {
                            resolve(error); // Resolve the Promise with true if successful
                        });
                } catch (error) {
                    toast.error("Server Error");
                    console.error("Error:", error);
                    reject(false);
                }
            });
        },
        validate3
    );
    const form4 = useFormValidation(
        {
            empNo: "",
            paymentType: "",
            bankName: "",
            accountNumber: "",
            accHolderName: "",
            ifscCode: "",
            branchName: "",
        },
        (values) => {
            return new Promise(async (resolve, reject) => {
                const endpoint = `/api/v1/emp/editemployee/emppayment/${state.empNo}`;
                try {
                    await instance
                        .put(endpoint, values)
                        .then((data) => {
                            toast.success("Employee Payment Info Updated Successfully");
                            // setForm1Success(true);
                            resolve(data); // Resolve the Promise with true if successful
                        })
                        .catch(async (error) => {
                            resolve(error); // Resolve the Promise with true if successful
                        });
                } catch (error) {
                    toast.error("Server Error");
                    console.error("Error:", error);
                    reject(false);
                }
            });
        },
        validate4
    );

    useLayoutEffect(() => {
        instance
            .get(`/api/v1/emp/employee/one/${state.empNo}`)
            .then((response) => {
                setEmpData(response.data);
                if (response?.data?.empBasicInfo) form1.setFormData(response.data.empBasicInfo);
                if (response?.data?.empPosition) form2.setFormData(response.data.empPosition);
                if (response?.data?.empStatutory) form3.setFormData(response.data.empStatutory);
                if (response?.data?.empPayment) form4.setFormData(response.data.empPayment);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [state]);

    const [isAccordion1Open, setIsAccordion1Open] = useState(true);

    const [isAccordion2Open, setIsAccordion2Open] = useState(false);

    const [isAccordion3Open, setIsAccordion3Open] = useState(false);

    const [isAccordion4Open, setIsAccordion4Open] = useState(false);

    const handleAccordion1Click = () => {
        setIsAccordion1Open(!isAccordion1Open);
    };
    const handleAccordion2Click = () => {
        setIsAccordion2Open(!isAccordion2Open);
    };
    const handleAccordion3Click = () => {
        setIsAccordion3Open(!isAccordion3Open);
    };
    const handleAccordion4Click = () => {
        setIsAccordion4Open(!isAccordion4Open);
    };
    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    if (!empData) {
        return <Loading />;
    }
    return (
        <div className="">
            <div>
                <Accordion expanded={isAccordion1Open} onClick={handleAccordion1Click}>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            <p className="block tracking-wide text-zinc-600 text-xl font-bold mr-2">Basic Information</p>
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}></Typography>
                    </AccordionSummary>
                    <AccordionDetails onClick={stopPropagation}>
                        <Typography>
                            <EmployeeDetails statusInp={false} form={form1} />
                            <Button
                                onClick={async () => {
                                    await form1.handleSubmit();
                                }}
                            >
                                Save
                            </Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={isAccordion2Open} onClick={handleAccordion2Click}>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            <p className="block tracking-wide text-zinc-600 text-xl font-bold mr-2">Employee Position</p>
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}></Typography>
                    </AccordionSummary>
                    <AccordionDetails onClick={stopPropagation}>
                        <Typography>
                            <Employeeposition form={form2} />
                            <Button
                                onClick={async () => {
                                    await form2.handleSubmit();
                                }}
                            >
                                Save
                            </Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={isAccordion3Open} onClick={handleAccordion3Click}>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            <p className="block tracking-wide text-zinc-600 text-xl font-bold mr-2">Statutory Info</p>
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}></Typography>
                    </AccordionSummary>
                    <AccordionDetails onClick={stopPropagation}>
                        <Typography>
                            <Statutoryinfo form={form3} />
                            <Button
                                onClick={async () => {
                                    await form3.handleSubmit();
                                }}
                            >
                                Save
                            </Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={isAccordion4Open} onClick={handleAccordion4Click}>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            <p className="block tracking-wide text-zinc-600 text-xl font-bold mr-2">Payment</p>
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}></Typography>
                    </AccordionSummary>
                    <AccordionDetails onClick={stopPropagation}>
                        <Typography>
                            <Payment form={form4} />
                            <Button
                                onClick={async () => {
                                    await form4.handleSubmit();
                                }}
                            >
                                Save
                            </Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
