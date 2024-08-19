import React, { useLayoutEffect, useRef, useState } from "react";
import { instance } from "../components/Url";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import Loading from "../components/ui/Loading";
import { Copy, Edit} from "lucide-react";
import Button from "../components/ui/Button";
export default function Settings() {
  const { state } = useLocation();
  const { user } = useAuthContext();
  const [empData, setEmpData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const eidRef = useRef();

  async function fetchInfo() {
    await instance
      .get("/api/v1/auth/userempinfo")
      .then((response) => {
        setEmpData(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }

  useLayoutEffect(() => {
    fetchInfo();
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="">
      <div className="rounded-xl bg-white p-4 divide-y">
        <div className="flex w-full items-center py-4">
          <div className="uppercase ml-2 h-16 w-16 text-3xl bg-theme-1 select-none flex items-center justify-center rounded-full text-white">
            {user &&
              user?.name.split(" ").map((str, i) => {
                if (i < 2) return str[0];
              })}
          </div>
          {user && (
            <div>
              <div className="mx-2 truncate  capitalize text-zinc-700 font-semibold text-2xl">
                {user?.name}
              </div>
              <div className="mx-2 truncate text-zinc-500 font-semibold ">
                {user.email}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 ml-auto ">
            <Button variant="ghost" size="icon">
              <Copy
                className="h-5"
                onClick={() => {
                  navigator.clipboard.writeText(eidRef.current.innerText);
                  toast.success("Copied to Clipboard");
                }}
              />
            </Button>
            <span className="font-semibold" ref={eidRef}>
              {empData?.empBasicInfo?.empNo}
            </span>
            <div className="flex justify-end p-4">
            <NavLink to="/profile/edit"><Button >Edit <Edit className="w-4 ml-1"/></Button></NavLink>
            </div>
          </div>
        </div>
        <div className="section py-4  ">
          <div className="text-xl my-2 relative font-semibold after:w-12 after:h-1  after:bg-theme-2 after:absolute after:left-0 after:-bottom-1 ">
            Personal Info
          </div>
          {empData?.empBasicInfo ? (
            <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 p-4 pt-8 gap-y-5">
              <div className="flex gap-2  ">
                <div className="font-medium">Date of birth :</div>
                <div
                  className="truncate"
                  title={empData?.empBasicInfo.dob
                    .split("-")
                    .reverse()
                    .join("-")}
                >
                  {empData?.empBasicInfo.dob.split("-").reverse().join("-")}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium">Mobile no :</div>
                <div
                  className="truncate"
                  title={empData?.empBasicInfo.mobileNo}
                >
                  {empData?.empBasicInfo.mobileNo}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap">
                  Emergency Mobile no :
                </div>
                <div
                  className="truncate"
                  title={empData?.empBasicInfo.mobileNo}
                >
                  {empData?.empBasicInfo.mobileNo}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap">Emergency Name :</div>
                <div
                  className="truncate"
                  title={empData?.empBasicInfo.emergencyName}
                >
                  {empData?.empBasicInfo.emergencyName}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap"> Salary :</div>
                <div className="truncate" title={empData?.empBasicInfo.salary}>
                  {empData?.empBasicInfo.salary}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap"> Status :</div>
                <div className="truncate" title={empData?.empBasicInfo.status}>
                  {empData?.empBasicInfo.status}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-zinc-500">No info Available</div>
          )}
        </div>
        <div className="section py-4  ">
          <div className="text-xl my-2 relative font-semibold after:w-12 after:h-1  after:bg-theme-2 after:absolute after:left-0 after:-bottom-1 ">
            Employee Position
          </div>
          {empData?.empPosition ? (
            <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 p-4 pt-8 gap-y-5 gap-x-2">
              {/* <div className="flex gap-2  ">
                                <div className="font-medium">Grade :</div>
                                <div className="truncate" title={empData?.empPosition.grade}>{empData?.empPosition.grade}</div>
                            </div>
                            <div className="flex gap-2  ">
                                <div className="font-medium">Cost Center :</div>
                                <div className="truncate" title={empData?.empPosition.costCenter}>{empData?.empPosition.costCenter}</div>
                            </div> */}
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap">Designation :</div>
                <div
                  className="truncate"
                  title={empData?.empPosition.designation?.name}
                >
                  {empData?.empPosition.designation?.name}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap">Location :</div>
                <div
                  className="truncate"
                  title={empData?.empPosition.location?.name}
                >
                  {empData?.empPosition.location?.name}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap"> Division :</div>
                <div
                  className="truncate"
                  title={empData?.empPosition.division?.name}
                >
                  {empData?.empPosition.division?.name}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap"> Department :</div>
                <div
                  className="truncate"
                  title={empData?.empPosition.department?.name}
                >
                  {empData?.empPosition.department?.name}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap"> Project :</div>
                <div
                  className="truncate"
                  title={empData?.empPosition.project?.name}
                >
                  {empData?.empPosition.project?.name}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap">
                  {" "}
                  Project Allocation Date :
                </div>
                <div
                  className="truncate"
                  title={empData?.empPosition.projectDate
                    .split("-")
                    .reverse()
                    .join("-")}
                >
                  {empData?.empPosition.projectDate
                    .split("-")
                    .reverse()
                    .join("-")}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap">
                  {" "}
                  Attendence Shift :
                </div>
                <div
                  className="truncate"
                  title={empData?.empPosition.shift?.name}
                >
                  {empData?.empPosition.shift?.name}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap"> Project Type :</div>
                <div
                  className="truncate"
                  title={
                    empData?.empPosition.isBillable
                      ? "Billable"
                      : "Non Billable"
                  }
                >
                  {empData?.empPosition.isBillable
                    ? "Billable"
                    : "Non Billable"}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap">
                  {" "}
                  Employee Status :
                </div>
                <div
                  className="truncate"
                  title={empData?.empPosition.empStatus?.name}
                >
                  {empData?.empPosition.empStatus?.name}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-zinc-500">No info Available</div>
          )}
        </div>
        <div className="section py-4  ">
          <div className="text-xl my-2 relative font-semibold after:w-12 after:h-1  after:bg-theme-2 after:absolute after:left-0 after:-bottom-1 ">
            Employee Statutory
          </div>
          {empData?.empStatutory ? (
            <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 p-4 pt-8 gap-y-5 gap-x-2">
              <div className="flex gap-2  ">
                <div className="font-medium">PAN Number :</div>
                <div className="truncate" title={empData?.empStatutory.panNo}>
                  {empData?.empStatutory.panNo}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium">Aadhar Number :</div>
                <div
                  className="truncate"
                  title={empData?.empStatutory.aadharNo}
                >
                  {empData?.empStatutory.aadharNo}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap">Passport Number :</div>
                <div
                  className="truncate"
                  title={empData?.empStatutory.passportNo}
                >
                  {empData?.empStatutory.passportNo}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap">UAN Number :</div>
                <div className="truncate" title={empData?.empStatutory.uanNo}>
                  {empData?.empStatutory.uanNo}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-zinc-500">No info Available</div>
          )}
        </div>
        <div className="section py-4  ">
          <div className="text-xl my-2 relative font-semibold after:w-12 after:h-1  after:bg-theme-2 after:absolute after:left-0 after:-bottom-1 ">
            Payment Mode
          </div>
          {empData?.empPayment ? (
            <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 p-4 pt-8 gap-y-5 gap-x-2">
              <div className="flex gap-2  ">
                <div className="font-medium">Payment Type :</div>
                <div
                  className="truncate"
                  title={empData?.empPayment.paymentType}
                >
                  {empData?.empPayment.paymentType}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium">Bank Name :</div>
                <div className="truncate" title={empData?.empPayment.bankName}>
                  {empData?.empPayment.bankName}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap">
                  Bank Account Number :
                </div>
                <div
                  className="truncate"
                  title={empData?.empPayment.accountNumber}
                >
                  {empData?.empPayment.accountNumber}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium text-nowrap">
                  Account Holder Name :
                </div>
                <div
                  className="truncate"
                  title={empData?.empPayment.accHolderName}
                >
                  {empData?.empPayment.accHolderName}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium">IFSC Code :</div>
                <div className="truncate" title={empData?.empPayment.ifscCode}>
                  {empData?.empPayment.ifscCode}
                </div>
              </div>
              <div className="flex gap-2  ">
                <div className="font-medium">Branch Name :</div>
                <div
                  className="truncate"
                  title={empData?.empPayment.branchName}
                >
                  {empData?.empPayment.branchName}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-zinc-500">No info Available</div>
          )}
        </div>
      </div>
      {/* <div>
          <Accordion expanded={isAccordion1Open} onClick={handleAccordion1Click}>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
              <p className="block tracking-wide text-zinc-600 text-xl font-bold mr-2">
                  Basic Information
              </p>
              </Typography>
              <Typography sx={{ color: "text.secondary" }}></Typography>
            </AccordionSummary>
            <AccordionDetails onClick={stopPropagation}>
              <Typography>
                
                
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
                <p className="block tracking-wide text-zinc-600 text-xl font-bold mr-2">
                Employee Position
              </p>
              </Typography>
              <Typography sx={{ color: "text.secondary" }}></Typography>
            </AccordionSummary>
            <AccordionDetails onClick={stopPropagation}>
              <Typography>
                
               
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
                <p className="block tracking-wide text-zinc-600 text-xl font-bold mr-2">
                Statutory Info
              </p>
              </Typography>
              <Typography sx={{ color: "text.secondary" }}></Typography>
            </AccordionSummary>
            <AccordionDetails onClick={stopPropagation}>
              <Typography>
                
                
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
                <p className="block tracking-wide text-zinc-600 text-xl font-bold mr-2">
                Payment
              </p>
              </Typography>
              <Typography sx={{ color: "text.secondary" }}></Typography>
            </AccordionSummary>
            <AccordionDetails onClick={stopPropagation}>
              <Typography>
                
               
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div> */}
    </div>
  );
}