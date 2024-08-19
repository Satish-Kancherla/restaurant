import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Download, LoaderIcon, X } from "lucide-react";
import EmployeeDetails from "./EmployeeDetails";
import Button from "../../components/ui/Button";
import * as FormElements from "../../components/ui/FormElements";
import Statutoryinfo from "./Statutoryinfo";
import Payment from "./Payment";
import Employeeposition from "./Employeeposition";
import { useFormValidation } from "../../hooks/useFormValidation";
import { validate1 } from "./validators";
import { validate2 } from "./validators";
import { validate3 } from "./validators";
import { validate4 } from "./validators";
import { getUrl, instance } from "../../components/Url";
import { useAuthContext } from "../../contexts/AuthContext";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddEmployee() {
    const { user } = useAuthContext();
    const url = getUrl();
    const navigator = useNavigate();

    const [fileData, setFileData] = useState();
    const filedataInputRef = useRef();
    const [fileMenu, setFileMenu] = useState(false);
    const [fileMenuAnchor, setFileMenuAnchor] = useState(false);
    const handleChangeFileData = (e) => {
        if (e.target.files[0]) {
            setFileData(e.target.files[0]);
        }
    };

    function handleMenuOpen(e) {
        e.preventDefault();
        setFileMenuAnchor(e.currentTarget);
        setFileMenu(true);
    }
    const handleDownload = async () => {
        try {
            const response = await instance.get("/api/public/admin/hrnext-addemployee.xlsx", {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "hrnext-addemployee.xlsx");
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            // Handle any errors here
            console.error("Error downloading file:", error);
        }
    };

    const handleFileUpload = () => {
        if (!fileData) {
            console.warn("Please select an excel file");
            return;
        }

        const formData = new FormData();
        formData.append("excel", fileData);
        instance
            .post("/api/v1/emp/addemployee/bulk", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                timeout: 1000 * 60 * 2, //milliseconds*seconds*minutes
            })
            .then((response) => {
                if (fileData) setFileData();
                toast.success(response.data.message);
                filedataInputRef.current.value = null;
                formData.delete("excel");
            })
            .catch((error) => {
                filedataInputRef.current.value = null;
                toast.error(error.response.data.message);
                formData.delete("excel");
                setFileData();
            });
    };
    useEffect(() => {
        handleFileUpload();
    }, [fileData]);

    const [form1Success, setForm1Success] = useState(false);
    const [form2Success, setForm2Success] = useState(false);
    const [form3Success, setForm3Success] = useState(false);
    const [form4Success, setForm4Success] = useState(false);
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
            return new Promise(async (resolve, reject) => {
                const endpoint = "/api/v1/emp/addemployee/empbasicinfo";
                try {
                    await instance
                        .post(endpoint, values)
                        .then((data) => {
                            console.log(data);
                            toast.success("Employee Basic Info Added Successfully");
                            setForm1Success(true);
                            resolve(data); // Resolve the Promise with true if successful
                        })
                        .catch(async(error) => {
                            console.log(error.response);
                            if (error.response.status === 406) {
                                toast.error(error.response.data.message);
                            } else if (error.response.status === 400) {
                                toast.error(error.response.data.message);
                            }
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
        },
        async (values) => {
            return new Promise(async (resolve, reject) => {
                const endpoint = "/api/v1/emp/addemployee/empposition";

                try {
                    await instance
                        .post(endpoint, values)
                        .then((data) => {
                            console.log(data);
                            toast.success("Employee Position Info Added Successfully");
                            setForm1Success(true);
                            resolve(data); // Resolve the Promise with true if successful
                        })
                        .catch(async(error) => {
                            console.log(error.response);
                            if (error.response.status === 406) {
                                toast.error(error.response.data.message);
                            } else if (error.response.status === 400) {
                                toast.error(error.response.data.message);
                            }
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
        async (values) => {
            return new Promise(async (resolve, reject) => {
                const endpoint = "/api/v1/emp/addemployee/empstatutory";
                try {
                    await instance
                        .post(endpoint, values)
                        .then((data) => {
                            console.log(data);
                            toast.success("Employee Statutory Info Added Successfully");
                            setForm1Success(true);
                            resolve(data); // Resolve the Promise with true if successful
                        })
                        .catch(async(error) => {
                            console.log(error.response);
                            if (error.response.status === 406) {
                                toast.error(error.response.data.message);
                            } else if (error.response.status === 400) {
                                toast.error(error.response.data.message);
                            }
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
        async (values) => {
            return new Promise(async (resolve, reject) => {
                const endpoint = "/api/v1/emp/addemployee/emppayment";

                try {
                    await instance
                        .post(endpoint, values)
                        .then((data) => {
                            console.log(data);
                            toast.success("Employee Payment Info Added Successfully");
                            setForm1Success(true);
                            resolve(data); // Resolve the Promise with true if successful
                        })
                        .catch(async(error) => {
                            console.log(error.response);
                            if (error.response.status === 406) {
                                toast.error(error.response.data.message);
                            } else if (error.response.status === 400) {
                                toast.error(error.response.data.message);
                            }
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

    useEffect(() => {
        form2.formData.empNo = form1.formData.empNo;
        form3.formData.empNo = form1.formData.empNo;
        form4.formData.empNo = form1.formData.empNo;
    }, [form1.formData.empNo]);

    const [isAccordion1Open, setIsAccordion1Open] = useState(true);
    const [inputValue1, setInputValue1] = useState("");

    const [isAccordion2Open, setIsAccordion2Open] = useState(false);
    const [inputValue2, setInputValue2] = useState("");

    const [isAccordion3Open, setIsAccordion3Open] = useState(false);
    const [inputValue3, setInputValue3] = useState("");

    const [isAccordion4Open, setIsAccordion4Open] = useState(false);
    const [inputValue4, setInputValue4] = useState("");

    const handleAccordion1Click = () => {
        setIsAccordion1Open(!isAccordion1Open);
    };

    const handleInputChange1 = (event) => {
        setInputValue1(event.target.value);
        setIsAccordion2Open(true); // Open the next AccordionDetails
    };

    const handleAccordion2Click = () => {
        setIsAccordion2Open(!isAccordion2Open);
    };

    const handleInputChange2 = (event) => {
        setInputValue2(event.target.value);
        setIsAccordion3Open(true); // Open the next AccordionDetails
    };

    const handleAccordion3Click = () => {
        setIsAccordion3Open(!isAccordion3Open);
    };

    const handleInputChange3 = (event) => {
        setInputValue3(event.target.value);
    };
    const handleAccordion4Click = () => {
        setIsAccordion4Open(!isAccordion4Open);
    };

    const handleInputChange4 = (event) => {
        setInputValue4(event.target.value);
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };
    return (
        <div className="">
            <div className="flex py-4 items-center justify-end">
                <div className="flex ">
                    <label
                        htmlFor="upload-file"
                        className=" flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-opacity-90 active:bg-opacity-60 active:scale-95  rounded-s-md flex-col bg-theme-2 text-theme-text h-10 px-4 min-w-10 py-2 ml-auto"
                        title="Add Excel file to bulk Add employees"
                    >
                        {fileData ? (
                            <div className=" truncate max-w-64">
                                {fileData?.name} <LoaderIcon className="animate-spin" />
                            </div>
                        ) : (
                            <>
                                <div className="h-4">Bulk Employee Upload</div>
                                <div className="text-xs text-zinc-700">(.xlsx)</div>
                            </>
                        )}
                    </label>
                    <input
                        type="file"
                        ref={filedataInputRef}
                        id="upload-file"
                        className="hidden"
                        onChange={handleChangeFileData}
                        accept=" application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />
                    <div className="bg-theme-2/20 w-0.5"></div>
                    <Button className="rounded-none rounded-e" size="icon" onClick={handleMenuOpen}>
                        <ChevronDown />
                    </Button>
                    <Menu
                        open={Boolean(fileMenu)}
                        onClose={() => {
                            setFileMenu(false);
                        }}
                        anchorEl={fileMenuAnchor}
                    >
                        <MenuItem onClick={handleDownload}>
                            <Download className="pr-2" />
                            Download Template
                        </MenuItem>
                    </Menu>
                </div>
            </div>
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
                            <EmployeeDetails form={form1} />
                            <Button
                                onClick={async () => {
                                    const okay = await form1.handleSubmit();
                                    if (okay) {
                                        console.log("form 1 submitted");
                                        handleAccordion2Click();
                                    }
                                }}
                                disabled={form1Success}
                            >
                                Submit & Next
                            </Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={isAccordion2Open}
                    onClick={async () => {
                        // const okay = await form1.handleSubmit();
                        // if (okay) {
                        //   console.log("form 1 submitted")
                        //   handleAccordion2Click()
                        // }
                        handleAccordion2Click();
                    }}
                >
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
                                    const okay = await form2.handleSubmit();
                                    if (okay) {
                                        console.log("form 2 submitted");
                                        handleAccordion3Click();
                                    }
                                }}
                                disabled={form2Success}
                            >
                                Submit & Next
                            </Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={isAccordion3Open}
                    onClick={async () => {
                        // const okay = await form2.handleSubmit();
                        // if (okay) {
                        //   console.log("form submitted")
                        //
                        // }
                        handleAccordion3Click();
                    }}
                >
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
                                    const okay = await form3.handleSubmit();
                                    if (okay) {
                                        console.log("form 3 submitted");
                                        handleAccordion4Click();
                                    }
                                }}
                                disabled={form3Success}
                            >
                                Submit & Next
                            </Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={isAccordion4Open}
                    onClick={async () => {
                        // const okay = await form3.handleSubmit();
                        // if (okay) {
                        //   console.log("form submitted")
                        //   handleAccordion4Click()
                        // }
                        handleAccordion4Click();
                    }}
                >
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
                                    const okay = await form4.handleSubmit();
                                    if (okay) {
                                        console.log("form submitted");
                                    }
                                }}
                                disabled={form4Success}
                            >
                                Finish
                            </Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}

function TabsList(props) {
    const { className, children } = props;
    return (
        <nav className={cn("", className)} {...props}>
            <div className="absolute"></div>
            {children}
        </nav>
    );
}

function TabsTrigger(props) {
    const { tab, selectTab, tabIndex, icon, active } = props;
    return (
        <button
            onClick={() => selectTab(tabIndex)}
            className={cn("p-2 flex items-center justify-center duration-200", props.className, tab === tabIndex && (active || "border-b-blue-500"))}
        >
            {icon && icon}
            {props.children}
        </button>
    );
}
function TabsContent(props) {
    const { tab, tabIndex, className } = props;
    return (
        tab === tabIndex && (
            <div className={cn("container", className)} {...props}>
                {props.children}
            </div>
        )
    );
}
