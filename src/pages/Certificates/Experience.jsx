import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import Button from "../../components/ui/Button";
import acqlogo from "../../assets/accentiqa.jpg";
import { instance } from "../../components/Url";
import { useAuthContext } from "../../contexts/AuthContext";
import sign from "../../assets/sign.png";
import { useReactToPrint } from "react-to-print";
import Loading from "../../components/ui/Loading";

const Experience = () => {
  const { user } = useAuthContext();
  const { state } = useLocation();
  const [empData, setEmpData] = useState();
  const [designation, setDesignation] = useState();
  const [isLoading,setIsLoading] = useState(true);

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
    instance
      .get(`/api/v1/misc/designations/${empData?.empPosition?.designationId}`)
      .then((res) => {
        setDesignation(res.data.name);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false)
      });
  }

  useEffect(() => {
    if (empData) translate();
  }, [empData]);


  const conponentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Experience Letter",
  });

  if(isLoading){
    return <Loading />
  }else
  {

  return (
    <div className="">
      <div
        className=" min-h-screen flex justify-center pt-10"
        id="content-convert"
        ref={conponentPDF}
      >
        <div className="w-full h-full md:w-3/4 lg:w-2/2   bg-white rounded-lg">
          <div className="grid place-items-start m-8  mb-5  logo select-none">
            <img className="h-10 text-start" src={acqlogo} alt="" />
          </div>
          <p className="text-right mr-16 mb-10 font-bold">{dateString}</p>
          <h1 className="text-lg text-center font-bold mb-15 underline">
            CERTIFICATE OF EXPERIENCE
          </h1>
          <div className="mt-20 mb-10">
            <p className="m-6">
              This is to certify that{" "}
              <b>
              {empData?.empBasicInfo?.gender=="male"?"Mr":"Ms/Mrs"}.{empData?.empBasicInfo?.fname} {empData?.empBasicInfo?.lname}
              </b>{" "}
              bearing employee ID <b>{empData?.empBasicInfo?.empNo}</b>, has
              worked with <b>Accentiqa Systems Private Ltd</b> as{" "}
              <b>{designation}</b> from{" "}
              <b>{empData?.empBasicInfo?.doj.split("-").reverse().join("-")}</b>{" "}
              to <b>{dateString}</b>{" "}
            </p>
            <p className="mx-6">
              In this Period, we found him Sincere, Hardworking and
              Satisfactory.
            </p>
            <p className="mx-6">
              We take this opportunity to thank him for his contribution and
              wish him success in his Future Endeavors.
            </p>
          </div>
          <div className="text-left m-6 my-20 pt-20  ">
            <p>Best Regards,</p>
            <p>
              For<b> ACCENTIQA SYSTEMS PRIVATE LIMITED</b>
            </p>
            <img src={sign} alt="" />
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
}

export default Experience;
