import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import Button from "../../components/ui/Button";
import acqlogo from "../../assets/accentiqa.jpg";
import sign from "../../assets/sign.png";
import { useAuthContext } from "../../contexts/AuthContext";
import { instance } from "../../components/Url";
import { useReactToPrint } from "react-to-print";
import Loading from "../../components/ui/Loading";

const Probation = () => {
  const { user } = useAuthContext();
  const { state } = useLocation();
  const [empData, setEmpData] = useState();
  const [designation, setDesignation] = useState();
  const [isLoading,setIsLoading] = useState(true)

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const dateString = `${day}-${month}-${year}`;

  function fetchEmpData() {
    instance
      .get(`/api/v1/emp/employee/one/${state.data.id}`)
      .then((res) => {
        setEmpData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  useLayoutEffect(() => {
    fetchEmpData();
  }, []);

  function translate() {
    instance.get(`/api/v1/misc/designations/${empData.empPosition?.designationId}`)
      .then((res) => {
        setDesignation(res.data.name);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    if (empData) translate();
  }, [empData]);

  const conponentPDF= useRef(); 

  const generatePDF= useReactToPrint({
    content: ()=>conponentPDF.current,
    documentTitle:"Probation Letter",
   
});


const joiningDate = empData?.empBasicInfo?.doj;

const formattedJoiningDate = new Date(joiningDate);

const sixMonthsLater = new Date(formattedJoiningDate);
sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

// const sixMonthsLaterStr = sixMonthsLater.toLocaleDateString('en-IN').replace('/','-');


const formattedJoiningDateStr = `${formattedJoiningDate.getDate()}-${formattedJoiningDate.getMonth() + 1}-${formattedJoiningDate.getFullYear()}`;

let sixMonthsLaterStr;

if (sixMonthsLater.getMonth() > 9){
   sixMonthsLaterStr = `${sixMonthsLater.getDate()}-${sixMonthsLater.getMonth() + 1}-${sixMonthsLater.getFullYear()}`;
  
}else{
   sixMonthsLaterStr = `0${sixMonthsLater.getDate()}-0${sixMonthsLater.getMonth() + 1}-${sixMonthsLater.getFullYear()}`;
 
}



if(isLoading){
  return <Loading />
}else{
  return (
    <div className="">
      <div
        className=" min-h-screen flex justify-center items-center "ref={conponentPDF}
        id="content-convert"
      >
        <div className="w-full h-full md:w-3/4 lg:w-2/2   bg-white rounded-lg" >
          <div className="grid place-items-start m-8  mb-5  logo select-none">
            <img className="h-10 text-start" src={acqlogo} alt="" />
          </div>
          <p className="text-right mr-16 mb-10 font-bold ">{dateString}</p>
          <h1 className="text-lg text-center font-bold mb-14 underline">
            Probation Completion Letter
          </h1>
          <div className="text-left m-6 mb-10">
            <p>
              Dear <b>{empData?.empBasicInfo?.gender=="male"?"Mr":"Ms/Mrs"}. {empData?.empBasicInfo?.fname} {empData?.empBasicInfo?.lname}</b>
            </p>
            <p>
              Emp ID: <b>{empData?.empBasicInfo?.empNo}</b>
            </p>
          </div>
          <p className="m-6">
            With reference to your appointment with our company for{" "}
            <b>{designation}</b>. You became a part of the{" "}
            <b>Accentiqa</b> on <b>{empData?.empBasicInfo?.doj.split("-").reverse().join("-")}</b> and you have been under
            probation period for Six months which comes to end on by{" "}
            <b>{sixMonthsLaterStr}</b>
          </p>
          <p className="mx-6">
            We are pleased to inform you that you have successfully completed
            your Six months probation period. Based on your performance
            evaluation done by our technical team you have been made{" "}
            <b>permanent employee of Accentiqa Systems Pvt Ltd,</b>
          </p>
          <p className="m-6">
            Further, you will have all the perquisites which are provided to our
            permanent employees.
          </p>
          <p className="mx-6">
            We wish you all the best for the future endeavors
          </p>
          <div className="text-left m-6  mt-10 ">
            <p>Best Regards,</p>
            <p>
              For<b> ACCENTIQA SYSTEMS PRIVATE LIMITED</b>
            </p>
            <img src={sign} alt=""/>
            <p className="font-bold">Radhika K</p>
            <p>Director</p>
            <p>ACCENTIQA SYSTEMS PRIVATE LIMITED</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-sm text-zinc-500">ACCENTIQA SYSTEMS PRIVATE LIMITED</span>
            <span className="text-2xs text-zinc-500">
              JSP Imperia Building,3rd Floor, Street No 3, Patrikanagar,
              Madhapor,500081, Hyderabad, Telangana Phone 040-40068214
            </span>
          </div>
        </div>
      </div>
      <Button
        iconleft={<Download className="mr-2" />}
        className=" py-2 px-4 my-10 "
        onClick={generatePDF}
      >
        Download PDF
      </Button>
    </div>
  );
};
};

export default Probation;
