import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "../../components/ui/Button";
import acqlogo from "../../assets/accentiqa.jpg";
import { Download } from "lucide-react";
import sign from "../../assets/sign.png";
import { instance } from "../../components/Url";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import Loading from "../../components/ui/Loading";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const ordinalSuffix = getOrdinalSuffix(day);

  return `${day}${ordinalSuffix} ${month} ${year}`;
};

const getOrdinalSuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
export default function Trainee() {
  const { state } = useLocation();
  const formattedDate = formatDate();
  const [empData, setEmpData] = useState();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  function fetchEmpData() {
    instance
      .get(`/api/v1/emp/employee/one/${state.data.id}`)
      .then((res) => {
        setEmpData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }
  useLayoutEffect(() => {
    fetchEmpData();
  }, []);

  const conponentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Experience Letter",
  });
  if(isLoading){
    return <Loading />
  }else
  return (
    <div>
      <div
        className=" min-h-screen flex flex-col justify-center items-center"
        id="content-convert"
        ref={conponentPDF}
      >
        <section className="mt-5 px-10">
          <div className="mt-10 w-full h-full md:w-3/4 lg:w-2/2   bg-white rounded-lg">
            <div className="print-only grid place-items-start logo select-none fixed inset-x-0 top-0">
              <img
                className="hidden print:block h-10 m-10 text-start"
                src={acqlogo}
                alt=""
              />
            </div>
          </div>
          <div className="not-print grid place-items-start logo select-none">
            <img className="h-10 m-10 text-start" src={acqlogo} alt="" />
          </div>
          <div className="mt-32">
            <p className="text-right mb-10 font-bold">
              {formatDate(new Date())}
            </p>
          </div>
          <div className="">
            <p className=" font-bold">
              Dear {empData?.empBasicInfo?.gender === "male" ? "Mr" : "Ms/Mrs"}.{" "}
              {empData?.empBasicInfo?.fname} {empData?.empBasicInfo?.lname},
            </p>
          </div>
          <div className="mt-5">
            <p>
              Sub: Employment Offer,
              <span className="font-bold">
                Trainee Engineer,{" "}
                {empData?.empBasicInfo?.gender === "male" ? "Mr" : "Ms/Mrs"}.{" "}
                {empData?.empBasicInfo?.fname} {empData?.empBasicInfo?.lname},
                ACCENTIQA SYSTEMS PVT LTD{" "}
              </span>{" "}
              – Hi-Tech City, Hyderabad, India.
            </p>
          </div>
          <div className="mt-5">
            <p>
              It is a great pleasure to extend an offer of employment to you as{" "}
              <span className="font-bold">Trainee Engineer </span>in our
              Information Technology Experts Group. Your Start date in our
              organization{" "}
              <span className="font-bold">
                {formatDate(empData?.empBasicInfo?.doj)}
              </span>
            </p>
          </div>
          <div className="mt-5 print:">
            <p className="font-bold">
              <u>Compensation</u>
            </p>
            <p className="mt-5">
              You will be paid a stipend of Rs {empData?.empBasicInfo?.salary}/-
              per month. You would be trained according to project needs for a
              period of 6 months. After completion of training, you would be
              assessed by the ProjectTeam, Upon satisfactory feedback on your
              assessment, You would be deployed into the project. After
              successful deployment into the project your designation and pay
              will be revised and probation period starts, Their on-performance
              evaluations are done bi-annually, and compensation appraisals are
              done annually. However, constant communication is a cornerstone of
              ACCENTIQA SYSTEMS PVT LTD success, and we encourage an ongoing
              mutual exchange of career growth ideas and suggestions.
            </p>
            <p className="mt-5">
              During your employment, Company would be investing amount and time
              on you. You are requested to utilize this opportunity on a good
              note. You need to abide the rules, regulations and timings of the
              company, If your conduct during the employment found
              dissatisfactory you would be terminated from the company without
              prior notice.
            </p>
            <p className="mt-5">
              Gratuity, on separation of 4 years and 330 calendar days of
              continuous service, payable as per the Payment of Gratuity Act
            </p>
          </div>
          <div className="mt-5">
            <p className="font-bold">
              <u>Probationary Period</u>
            </p>
            <p className="mt-5">
              All new employees at ACCENTIQA SYSTEMS PVT LTD have a probationary
              period of 6 months. During this time, your progress will be
              evaluated, and a determination will be made concerning permanent
              employment. Notwithstanding anything contained herein, if you
              desire to terminate your employment, you shall provide Company
              Sixty (120) days prior written notice with reasons for such
              termination
            </p>
          </div>
        </section>
        <section className="page px-10">
          <div className="hidden print:block h-[100px]"></div>
          <div className="mt-5 w-fullbg-white ">
            <div className="">
              <p className="font-bold">
                <u>Terms and Conditions of Employment</u>
              </p>
              <p>
                You shall be governed by the following Terms and Conditions of
                Service (” Terms and Conditions”) during your employment with{" "}
                <span className="font-bold">
                  Accentiqa Systems Private Limited
                </span>{" "}
                (hereafter referred to as the “Company”), and those that may be
                amended from time to time in future
              </p>
            </div>
            <div className="mt-5">
              <p className="font-bold">1. Statement of facts</p>
              <p>
                The Company has made the offer of employment on the basis of the
                bonafide statements and facts provided by you in your
                application form for employment. The Company reserves the right
                to terminate your services forthwith at the time of joining or
                at any point of time in future during your employment with the
                Company if any of the Information provided by you is found to be
                false or misleading or concealed (whether in part or whole) and
                / or in case of any criminal background on your part. You hereby
                agree and expressly authorize the Company to conduct background
                verification to authenticate the Information submitted by you
                and your criminal background, if any.
              </p>
            </div>
            <div className="mt-5">
              <p className="font-bold">2.Duties</p>
              <div className="flex">
                <span className="px-5">● </span>
                <p>
                  During working hours, you shall satisfactorily perform all
                  tasks assigned by the Supervisor, to the expected performance
                  standards. You shall comply with the rules, regulations and
                  procedures as notified from time to time by the Company in
                  letter and spirit.
                </p>
              </div>
              <div className="flex">
                <span className="px-5">● </span>
                <p>
                  During working hours, you shall entirely devote your time,
                  attention and abilities to the business of the Company.
                </p>
              </div>
              <div className="flex">
                <span className="px-5">● </span>
                <p>
                  You shall not, without the Company's prior written consent, be
                  in any way directly or indirectly engaged in or concerned with
                  any other business or employment during or outside your hours
                  of work in the Company. You shall however, undertake honorary
                  work of social or charitable nature, literary, artistic or
                  scientific character only with the express permission from the
                  competent authority of the Company.
                </p>
              </div>
              <div className="flex">
                <span className="px-5">● </span>
                <p>
                  During your employment, you shall not directly or indirectly
                  engage in any conduct averse to the best interests of the
                  Company. Also, you shall not divulge any confidential
                  information or violate any agreement(s) with your prior
                  employers or their clients.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-bold">3. Hours of work</p>
            <p>
              The working day shall comprise eight (9) working hours and a lunch
              break for an hour. Depending upon Company's requirement/ exigency,
              the Company may increase or decrease the per day working hours
              without your consent. Though the normal working hours are between
              9.00 a.m. and 6.00 p.m. from Monday through Friday, you may be
              required to work on a shift basis that comprises nine working
              hours and a break for an hour. You are expected to work in shifts
              assigned by the supervisor.
            </p>
          </div>
        </section>
        <section className="page px-10">
          <div className="hidden print:block h-[120px]"></div>
          <p>
            The shifts may be scheduled across 24 hours a day, 7 days a week and
            365 days a year. The shift timings may change from time to time on
            which you will be notified in advance.
          </p>
          <div className="mt-5">
            <p className="font-bold">4. Conduct</p>
            <div className="flex">
              <span className="px-5">● </span>
              <p>
                You shall at all times, maintain exemplary conduct and decorum.
                You shall uphold honesty and integrity in all your actions.
              </p>
            </div>
            <div className="flex">
              <span className="px-5">● </span>
              <p>
                You shall honor and comply with all rules and regulations of the
                Company and statutory requirements, in letter and spirit.
              </p>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-bold">5. Dress Code</p>
            <p>
              As an associate of an organization that focuses on quality and
              professionalism, it is imperative to maintain the highest level of
              personal effectiveness and that can in no way be compromised.
              Therefore, you must adhere to Accentiqa’s dress code while at
              work. The smart dress code will continue to help you display a
              professional image to customers, potential employees and the
              community of visitors.
            </p>
          </div>
          <div className="mt-5">
            <p className="font-bold">6. Confidentiality</p>
            <div className="flex">
              <span className="px-5">● </span>
              <p>
                You shall maintain utmost secrecy with regard to confidential
                and proprietary information relating to the Company. This
                information includes and is not limited to trade secrets,
                technical processes, finance and dealings with information
                relating to suppliers, employees, agents distributors and
                customers.
              </p>
            </div>
            <div className="flex">
              <span className="px-5">● </span>
              <p>
                You shall not, during your employment and at all times
                thereafter, directly or indirectly use or disclose confidential
                information except for the sole benefit of the Company. This
                restriction shall cease to apply when it may come into the
                public domain otherwise than through unauthorized disclosure by
                you or such information which you shall be obliged or disclose
                by law.
              </p>
            </div>
            <div className="flex">
              <span className="px-5">● </span>
              <p>
                You shall not take copies of confidential documents or
                information for your own purposes and forthwith upon
                termination, you shall return to the Company all documents,
                records and accounts in any form (including electronic,
                mechanical, photographic, and optic recording) relating to
                matters concerning the business or dealings or affairs of the
                Company.
              </p>
            </div>
            <div className="flex">
              <span className="px-5">● </span>
              <p>
                You shall not during your employment and at all times thereafter
                do or say anything that may injure directly or indirectly damage
                the business and / or reputation of the Company.
              </p>
            </div>
            <div className="flex">
              <span className="px-5">● </span>
              <p>
                You shall maintain utmost confidentiality with regard to your
                compensation and benefits. You shall not discuss your
                compensation and benefits with anyone, but with the Supervisor
                you report to.
              </p>
            </div>
          </div>
        </section>
        <section className="page px-10">
          <div className="hidden print:block h-[120px]"></div>
          <div className="flex flex-col">
            <p className="pl-20">
              a&#41;You shall sign and be bound by the following:
            </p>
            <p className="pl-20">
              b&#41;The Proprietary Rights and Non-Disclosure Agreement (NDA)
            </p>
            <p className="pl-20">
              c&#41;The Code of Business Conduct and Ethics
            </p>
            <p className="pl-20">
              d&#41;Prohibition on Disclosure or Use of inside Information
            </p>
            <p className="pl-20">
              e&#41;Default User Rights On Accentiqa Network
            </p>
          </div>
          <div className="mt-5">
            <p className="font-bold mb-5">7. Separation from the Company</p>
            <div className="flex">
              <span className="px-5">● </span>
              <p>
                The normal retirement age of employees in the Company is 58
                years.
              </p>
            </div>
            <div className="flex">
              <span className="px-5">● </span>
              <p>
                In case you intend to resign from the services of the Company at
                any point of time, you are required to serve 60 days’ Notice
                Period ('Notice Period') starting from the date of resignation.
              </p>
            </div>
            <div className="flex">
              <span className="px-5">● </span>
              <p>
                If your service is being terminated by the Company on the ground
                of Misconduct or misdemeanor or unsatisfactory performance or as
                consequence of any other disciplinary matter(s), the Company may
                release you on immediately based on the confirmation of
                management
              </p>
            </div>
            <div className="flex">
              <span className="px-5">● </span>
              <p>
                Your service may be terminated immediately on the grounds of
                misconduct with the client or interacting with the client
                without the concerning with your superior/Project Manager/
                company management
              </p>
            </div>
            <div className="pl-5 flex flex-col">
              <p className="font-bold mt-5 mb-5">Background Check</p>
              <p>
                You acknowledge and agree that ACCENTIQA SYSTEMS PVT LTD has
                offered you employment based on the specific information and
                records furnished by you or on your behalf. You will provide or
                arrange to have provided any information and/or grant any
                consent or permission required by Company and/or its agents from
                time to time to verify any such information and /or records
                and/or perform any background and/or reference checks. If, at
                any time, Company believes, in its sole discretion, that there
                is discrepancy or inaccuracy in or with respect to any
                information furnished by you or on your behalf, including any
                information, documents or certificates provided as a proof of
                your qualifications and experience, or if you fail to cooperate
                with company and/or its agents in conducting such verification
                and /or background and /or reference checks, company may, in its
                sole discretion, elect to terminate or suspend your employment
                immediately. In addition, this offer is based on your being and
                remaining medically fit as per company’s policy.
              </p>
              <p>
                You are also required to submit the following documents at the
                time of joining:
              </p>
            </div>
          </div>
        </section>
        <section className="page px-10">
          <div className="hidden print:block h-[120px]"></div>
          <div className="flex">
            <span className="px-5">● </span>
            <p>Copies of Marks Lists from X to the Highest Graduation</p>
          </div>
          <div className="flex">
            <span className="px-5">● </span>
            <p>
              Post-Graduation Copies of the Degree Certificates from the
              concerned University
            </p>
          </div>
          <div className="flex">
            <span className="px-5">● </span>
            <p>Relieving Letter in Original from the previous employer</p>
          </div>
          <div className="flex">
            <span className="px-5">● </span>
            <p>Pay slips for the last three months</p>
          </div>
          <div className="flex">
            <span className="px-5">● </span>
            <p>
              Previous employer Copies of Services Certificates from the last
              two Companies
            </p>
          </div>
          <div className="flex">
            <span className="px-5">● </span>
            <p>Health Insurance Details</p>
          </div>
          <div className="flex">
            <span className="px-5">● </span>
            <p>Passport size photos – 6 (Self)</p>
          </div>
          <div className="flex">
            <span className="px-5">● </span>
            <p>PAN Card copy Address Proof (2 copies)</p>
          </div>
          <div className="flex">
            <span className="px-5">● </span>
            <p>
              Passport copy (if available) and Driving License (if available)
            </p>
          </div>
          <div className="">
            <p className="mt-5">
              This offer is contingent upon detailed background verification of
              all the information and documents that you would be submitting to
              us and the client’s assignment.
            </p>
            <p className="mt-5">
              You may email the acceptance of the letter or deliver it in person
              to our Hyderabad Office located at JSP Imperia building, 3rd
              floor,Street No-3, Pathrika Nagar, Hi-tech City, Madhapur, and
              Hyderabad–500081. If you have any questions regarding this offer,
              please do not hesitate to contact us (040) 40068214.
            </p>
            <div className="">
              <p className="mt-5">
                We are enthusiastic about your joining our Information
                Technology experts’ team at{" "}
                <span className="font-bold">ACCENTIQA SYSTEMS PVT LTD</span> and
                believe your contributions, expertise, and attitude will be
                greatly appreciated by the Organization.
              </p>
            </div>
          </div>
          <div>
            <div className="text-left m-6 ">
              <p>Best Regards,</p>
              <p>
                For<b> ACCENTIQA SYSTEMS PRIVATE LIMITED</b>
              </p>
              <img src={sign} alt="" />
              <p className="font-bold">Radhika K</p>
              <p>Director</p>
              <p>ACCENTIQA SYSTEMS PRIVATE LIMITED</p>
            </div>
            <div className="pl-5">
              <p>
                I, {empData?.empBasicInfo?.gender === "male" ? "Mr" : "Ms/Mrs"}.{" "}
                {empData?.empBasicInfo?.fname} {empData?.empBasicInfo?.lname},
                do hereby agree to the terms of employment offered herein:
              </p>
            </div>
            <div className="flex p-10 justify-between">
              <span className="font-semibold">Signature</span>
              <span className="font-semibold">Date: -</span>
            </div>
            <div className="print-only">
              <div className=" flex flex-col justify-center items-center fixed inset-x-0 bottom-5">
                <span className="text-sm text-zinc-500">
                  ACCENTIQA SYSTEMS PRIVATE LIMITED
                </span>
                <span className="text-2xs text-zinc-500">
                  JSP Imperia Building,3rd Floor, Street No 3, Patrikanagar,
                  Madhapor,500081, Hyderabad, Telangana Phone 040-40068214
                </span>
              </div>
            </div>
            <div className="not-print">
              <div className="flex flex-col justify-center items-center inset-x-0 bottom-5">
                <span className="text-sm text-zinc-500">
                  ACCENTIQA SYSTEMS PRIVATE LIMITED
                </span>
                <span className="text-2xs text-zinc-500">
                  JSP Imperia Building,3rd Floor, Street No 3, Patrikanagar,
                  Madhapor,500081, Hyderabad, Telangana Phone 040-40068214
                </span>
              </div>
            </div>
          </div>
        </section>
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
}
