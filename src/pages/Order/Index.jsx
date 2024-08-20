import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Download, LoaderIcon, X } from "lucide-react";
import Button from "../../components/ui/Button";
import * as FormElements from "../../components/ui/FormElements";
import { useFormValidation } from "../../hooks/useFormValidation";
import { validate1 } from "./validators";
import {  instance } from "../../components/Url";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import OrderDetails from "./OrderDetails";

export default function AddEmployee() {


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
   
    const [form1Success, setForm1Success] = useState(false);

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
                const endpoint = "/api/v1/emp/addemployee";
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


    const [isAccordion1Open, setIsAccordion1Open] = useState(true);
    const [inputValue1, setInputValue1] = useState("");

    const handleAccordion1Click = () => {
        setIsAccordion1Open(!isAccordion1Open);
    };

    const handleInputChange1 = (event) => {
        setInputValue1(event.target.value);
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };
    return (      
            <div>
                <Accordion expanded={isAccordion1Open} onClick={handleAccordion1Click}>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            <p className="block tracking-wide text-zinc-600 text-xl font-bold mr-2">Order Items</p>
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}></Typography>
                    </AccordionSummary>
                    <AccordionDetails onClick={stopPropagation}>
                        <Typography>
                            <OrderDetails form={form1} />
                            <Button
                                onClick={async () => {
                                    const okay = await form1.handleSubmit();
                                    if (okay) {
                                        console.log("form submitted");
                                       
                                    }
                                }}
                                disabled={form1Success}
                            >
                                Submit
                            </Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>  
            </div>           
    );
}


