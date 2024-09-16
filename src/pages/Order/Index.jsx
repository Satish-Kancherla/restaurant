import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  LoaderIcon,
  X,
} from "lucide-react";
import Button from "../../components/ui/Button";
import * as FormElements from "../../components/ui/FormElements";
import { useFormValidation } from "../../hooks/useFormValidation";
import { validate1 } from "./validators";
import { instance } from "../../components/Url";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import OrderDetails from "./OrderDetails";

export default function OrderIndex() {
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
      category: "",
      itemname: "",
      notes: "",
      quantity: "",
      unitprice: "",
      total: "",
    },
    async (values) => {
      try {
        const response = await instance.post("http://localhost:5000/api/v1/orders", values);
        toast.success("Order Added Successfully");
        setForm1Success(true);
        return response;  // Only resolve on success
      } catch (error) {
        if (error.response) {
          if (error.response.status === 406 || error.response.status === 400) {
            toast.error(error.response.data.message);
          }
        } else {
          toast.error("Server Error");
        }
        return null;  // Handle errors appropriately
      }
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
            <p className="block tracking-wide text-zinc-600 text-xl font-bold mr-2">
              Order Items
            </p>
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
            >
              Submit
            </Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
