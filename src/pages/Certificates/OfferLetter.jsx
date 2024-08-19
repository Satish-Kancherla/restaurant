import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import Button from "../../components/ui/Button";
import acqlogo from "../../assets/accentiqa.jpg";
import sign from "../../assets/sign.png";
import { useAuthContext } from "../../contexts/AuthContext";
import { instance } from "../../components/Url";
import { useReactToPrint } from "react-to-print";
import { ToWords } from "to-words";
import Loading from "../../components/ui/Loading";

export default function OfferLetter() {
  const { user } = useAuthContext();
  const { state } = useLocation();
  const [empData, setEmpData] = useState();
  const [designation, setDesignation] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
      .get(`/api/v1/misc/designations/${empData.empPosition?.designationId}`)
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

  const conponentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Offer Letter",
  });

  const yearlySalary = empData?.empBasicInfo?.salary * 12;

  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: "Rupee",
        plural: "Rupees",
        symbol: "₹",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paise",
          symbol: "",
        },
      },
    },
  });

  //   const generateHeader = () => (
  //     <header className="text-zinc-500 text-center p-4 fixed top-0 left-0 right-0">
  //       <div className="grid place-items-center m-8 mt-5 mb-5  logo select-none">
  //         <img className="h-18  text-center" src={acqlogo} alt="" />
  //       </div>
  //     </header>
  //   );

  //   const generateFooter = () => (
  //     <footer className="text-zinc-500 text-center p-4 fixed bottom-0 left-0 right-0">
  //       <div className="flex flex-col justify-center items-center">
  //         <span className="text-sm text-zinc-500">
  //           ACCENTIQA SYSTEMS PRIVATE LIMITED
  //         </span>
  //         <span className="text-2xs text-zinc-500">
  //           JSP Imperia Building, 3rd Floor, Street No 3, Patrikanagar, Madhapor, 500081, Hyderabad, Telangana Phone 040-40068214
  //         </span>
  //       </div>
  //     </footer>
  //   );
  if (isLoading) {
    return <Loading />;
  } else
    return (
      <div className="">
        <div
          className="print:my-32 min-h-screen flex justify-center items-center "
          ref={conponentPDF}
          id="content-convert"
          style={{ marginTop: "100px", marginBottom: "100px" }}
        >
          <div className="w-full h-full  px-10   bg-white rounded-lg">
            <div className="print-only">
              <header className="hidden print:block text-zinc-500 text-center p-4 fixed  inset-x-0 top-0">
                <div className="grid place-items-center m-8 mt-5 mb-5  logo select-none">
                  <img className="h-18  text-center" src={acqlogo} alt="" />
                </div>
              </header>
            </div>
            <header className="not-print text-zinc-500 text-center p-4 inset-x-0 top-0">
              <div className="grid place-items-center m-8 -mt-20 mb-5  logo select-none">
                <img className="h-18  text-center" src={acqlogo} alt="" />
              </div>
            </header>
            {/* <header  className="hidden print:block text-zinc-500 text-center p-4 fixed  inset-x-0 top-0"> */}
            {/* {generateHeader()} */}
            {/* </header> */}
            <p className="text-right mr-16 mt-16 font-bold ">{dateString}</p>
            <div
              className="content"
              style={{ marginTop: "50px", marginBottom: "50px" }}
            >
              <div className="text-left m-6 mb-16">
                <p>Hyderabad,</p>
                <p>Telangana,India</p>

                <p className="mt-5">
                  <b className="capitalize">
                    Dear{" "}
                    {empData?.empBasicInfo?.gender == "male" ? "Mr" : "Ms/Mrs"}.
                    {empData?.empBasicInfo?.fname}{" "}
                    {empData?.empBasicInfo?.lname},
                  </b>
                </p>
              </div>
              <div>
                <p className="m-6">
                  Sub: Employment Offer,{" "}
                  <b>
                    {empData?.empBasicInfo?.fname}{" "}
                    {empData?.empBasicInfo?.lname}
                  </b>{" "}
                  ,<b>{designation}</b>,{" "}
                  <b>ACCENTIQA SYSTEMS PVT LTD– Hi-Tech City</b>, Hyderabad,
                  India.
                </p>
                <p className="mx-6">
                  It is a great pleasure to extend an offer of employment to you
                  as
                  <b> {designation}</b> in our Information Technology Experts
                  Group. Your Start date in our organization is{" "}
                  <b>
                    {empData?.empBasicInfo?.doj.split("-").reverse().join("-")}
                  </b>
                </p>
                <p className="m-6">
                  We welcome to the elite group of professionals at{" "}
                  <b>ACCENTIQA SYSTEMS PVT LTD</b>, who relentlessly pursue
                  excellence in their assignments by always exceeding the
                  customers’ expectations. As an
                  <b> ACCENTIQA SYSTEMS PVT LTD</b> professional, you will be
                  rated among the most knowledgeable and top-quality information
                  technology professionals in the industry.
                </p>
                <p className="mx-6 underline font-bold">Compensation</p>
                <p className="m-6">
                  Your total cost to company (CTC) is Rs. {yearlySalary}/- (
                  {toWords.convert(parseInt(yearlySalary))}, all Inclusive).
                  Performance evaluations are done bi-annually, and compensation
                  appraisals are done annually with the range depending upon the
                  clients’ appraisal. However, constant communication is a
                  cornerstone of ACCENTIQA SYSTEMS PVT LTD success, and we
                  encourage an ongoing mutual exchange of career growth ideas
                  and suggestions.
                </p>
                <p className="m-6">
                  Gratuity, on separation of 4 years and 330 calendar days of
                  continuous service is payable as per the Payment of Gratuity
                  Act
                </p>
                <section className="page ">
                  <div className="hidden print:block h-[150px]"></div>
                  <p className="mx-6 underline font-bold">
                    Probationary Period
                  </p>
                  <p className="m-6">
                    All new employees at ACCENTIQA SYSTEMS PVT LTD have a
                    probationary period of 6 months. During this time, your
                    performance, conduct dedication towards the project is
                    reviewed and evaluated, Once these parameters are found to
                    be satisfactory, Project manager recommends for the
                    confirmation of permanent employment, Once the probationary
                    period is confirmed you will be entitled for all the leaves
                    and other terms and conditions of the company. Please note
                    that the probationary period can be extended by one month if
                    your performance is not satisfactory, In case if you fail to
                    improve the performance during this month summing up to 7
                    months, you can be terminated on the same day without prior
                    notice. If you desire to terminate your employment, you
                    shall provide Company Sixty (60) days prior written notice
                    with reasons for such termination.
                  </p>
                  <p className="mx-6 underline font-bold">
                    Terms and Conditions of Employment
                  </p>
                  <p className="m-6">
                    You shall be governed by the following Terms and Conditions
                    of Service (” Terms and Conditions”) during your employment
                    with Accentiqa Systems Private Limited (hereafter referred
                    to as the “Company”), and those that may be amended from
                    time to time in future.
                  </p>
                  <p className="mx-6 font-bold">1. Statement of facts</p>

                  <p className="m-6 mt-2">
                    The Company has made the offer of employment on the basis of
                    the bonafide statements and facts provided by you in your
                    application form for employment. The Company reserves the
                    right to terminate your services forthwith at the time of
                    joining or at any point of time in future during your
                    employment with the Company if any of the Information
                    provided by you is found to be false or misleading or
                    concealed (whether in part or whole) and / or in case of any
                    criminal background on your part. You hereby agree and
                    expressly authorize the Company to conduct background
                    verification to authenticate the Information submitted by
                    you and your criminal background, if any.
                  </p>

                  <p className="mx-6 font-bold">2. Duties</p>
                  <ul className="list-disc">
                    <li className="m-6 mt-2 ml-16">
                      During working hours, you shall satisfactorily perform all
                      tasks assigned by the Supervisor, to the expected
                      performance standards. You shall comply with the rules,
                      regulations and procedures as notified from time to time
                      by the Company in letter and spirit
                    </li>
                  </ul>
                </section>
                <section className="page  ">
                  <div className="hidden print:block h-[150px]"></div>

                  <ul className="list-disc">
                    <li className="m-6 mt-2 ml-16">
                      During working hours, you shall entirely devote your time,
                      attention and abilities to the business of the Company
                    </li>
                    <li className="m-6 mt-2 ml-16">
                      You shall not, without the Company's prior written
                      consent, be in any way directly or indirectly engaged in
                      or concerned with any other business or employment during
                      or outside your hours of work in the Company. You shall
                      however, undertake honorary work of social or charitable
                      nature, literary, artistic or scientific character only
                      with the express permission from the competent authority
                      of the Company.
                    </li>
                    <li className="m-6 mt-2 ml-16">
                      During your employment, you shall not directly or
                      indirectly engage in any conduct averse to the best
                      interests of the Company. Also, you shall not divulge any
                      confidential information or violate any agreement(s) with
                      your prior employers or their clients.
                    </li>
                  </ul>
                  <p className="mx-6 font-bold">3. Hours of work</p>
                  <p className=" m-6 mt-2">
                    The working day shall comprise nine (9) working hours and a
                    lunch break for an hour. Depending upon Company's
                    requirement/ exigency, the Company may increase or decrease
                    the per day working hours without your consent though the
                    normal working hours are between 9.00 a.m. To 6.00 p.m. from
                    Monday through Friday, you may be required to work on a
                    shift basis that comprises nine working hours and a break
                    for an hour. You are expected to work on client’s time zone
                    based on the requirements and it will be assigned by the
                    supervisor.
                  </p>
                  <p className=" m-6 mt-2">
                    The shifts may be scheduled across 24 hours a day, 7 days a
                    week and 365 days a year. The shift timings may change from
                    time to time on which you will be notified in advance
                  </p>
                  <p className="mx-6 font-bold">4. Conduct</p>
                  <ul className="list-disc">
                    <li className="m-6 mt-2 ml-16">
                      You shall at all times, maintain exemplary conduct and
                      decorum. You shall uphold honesty and integrity in all
                      your actions.
                    </li>
                    <li className="m-6 mt-2 ml-16">
                      You shall honor and comply with all rules and regulations
                      of the Company and statutory requirements, in letter and
                      spirit.
                    </li>
                  </ul>
                </section>
                <section className="page  ">
                  <div className="hidden print:block h-[180px]"></div>

                  <p className="mx-6 font-bold">5. Dress Code</p>
                  <p className="m-6 mt-2">
                    As an associate of an organization that focuses on quality
                    and professionalism, it is imperative to maintain the
                    highest level of personal effectiveness and that can in no
                    way be compromised. Therefore, you must adhere to
                    Accentiqa’s dress code while at work. The smart dress code
                    will continue to help you display a professional image to
                    customers, potential employees and the community of
                    visitors.
                  </p>
                  <p className="mx-6 font-bold">6. Confidentiality</p>
                  {/* <ol className="list-decimal list-inside" style={{ listStyleType: 'lower-alpha' }}> */}
                  <ul className="list-disc">
                    <li className="m-6 mt-2 ml-16">
                      You shall maintain utmost secrecy with regard to
                      confidential and proprietary information relating to the
                      Company. This information includes and is not limited to
                      trade secrets, technical processes, finance and dealings
                      with information relating to suppliers, employees, agents’
                      distributors and customers.
                    </li>

                    <li className="m-6 mt-2 ml-16">
                      You shall not, during your employment and at all times
                      thereafter, directly or indirectly use or disclose
                      confidential information except for the sole benefit of
                      the Company. This restriction shall cease to apply when it
                      may come into the public domain otherwise than through
                      unauthorized disclosure by you or such information which
                      you shall be obliged or disclose bylaw.
                    </li>
                    <li className="m-6 mt-2 ml-16">
                      You shall not take copies of confidential documents or
                      information for your own purposes and forthwith upon
                      termination, you shall return to the Company all
                      documents, records and accounts in any form (including
                      electronic, mechanical, photographic, and optic recording)
                      relating to matters concerning the business or dealings or
                      affairs of the Company.
                    </li>
                    <li className="m-6 mt-2 ml-16">
                      You shall not during your employment and at all times
                      thereafter do or say anything that may injure directly or
                      indirectly damage the business and / or reputation of the
                      Company.
                    </li>
                    <li className="m-6 mt-2 ml-16">
                      You shall maintain utmost confidentiality with regard to
                      your compensation and benefits. You shall not discuss your
                      compensation and benefits with anyone, but with the
                      Supervisor you report to.
                    </li>
                  </ul>
                </section>
                <section className="page">
                  <div className="hidden print:block h-[135px]"></div>

                  <p className="mr-6 mt-2 ml-28">
                    a&#41; You shall sign and be bound by the following:
                  </p>
                  <p className="ml-28">
                    b&#41; The Proprietary Rights and Non-Disclosure Agreement
                    (NDA)
                  </p>
                  <p className="ml-28">
                    c&#41; The Code of Business Conduct and Ethics
                  </p>

                  <p className="ml-28">
                    d&#41; Prohibition on Disclosure or Use of inside
                    Information
                  </p>
                  <p className="ml-28">
                    e&#41; Default User Rights On Accentiqa Network
                  </p>
                  {/* </section> */}

                  <p className="mx-6 my-2 font-bold">
                    7. Separation from the Company
                  </p>
                  <ul className="list-disc"
                    // className="list-decimal list-inside mb-5"
                    // style={{ listStyleType: "lower-alpha" }}
                  >
                    <li className="  ml-16">
                      During the probation period, if your performance in the
                      project is not satisfactory you would be given a week
                      notice and would be asked to quit the company
                    </li>
                    <li className=" ml-16">
                      The normal retirement age of employees in the Company is
                      58 years.
                    </li>
                    <li className=" ml-16">
                      In case you intend to resign from the services of the
                      Company at any point of time, you are required to serve 60
                      days’ Notice Period ('Notice Period') starting from the
                      date of resignation.
                    </li>
                    <li className=" ml-16">
                      If your service is being terminated by the Company on the
                      ground of Misconduct or Misdemeanor or unsatisfactory
                      performance or as consequence of any other disciplinary
                      matter, the Company may release you on immediately based
                      on the confirmation of management
                    </li>
                    <li className=" ml-16">
                      Your service may be terminated immediately on the grounds
                      of misconduct with the client or interacting with the
                      client without the concerning with your superior/Project
                      Manager/ company management
                    </li>
                  </ul>
                  <p className="mx-6  font-bold">Background Check</p>
                  <p className="m-6 mt-2">
                    You acknowledge and agree that{" "}
                    <b>ACCENTIQA SYSTEMS PVT LTD</b> has offered you employment
                    based on the specific information and records furnished by
                    you or on your behalf. You will provide or arrange to have
                    provided any information and/or grant any consent or
                    permission required by Company and/or its agents from time
                    to time to verify any such information and /or records
                    and/or perform any background and/or reference checks. If,
                    at any time, Company believes, in its sole discretion, that
                    there is discrepancy or inaccuracy in or with respect to any
                    information furnished by you or on your behalf, including
                    any information, documents or certificates provided as a
                    proof of your qualifications and experience, or if you fail
                    to cooperate with company and/or it’s Agents in conducting
                    such verification and/or background and/or reference checks,
                    company may, in its sole discretion, elect to terminate or
                    suspend your employment immediately. In addition, this offer
                    is based on your being and remaining medically fit as per
                    company’s policy
                  </p>
                </section>
                <section className="page ">
                  <div className="hidden print:block h-[150px]"></div>

                  <p className="m-6 mt-2">
                    You are also required to submit the following documents at
                    the time of joining:
                  </p>
                  <p className="ml-28">
                    a. Copies of Marks Lists from X to the Highest Graduation
                  </p>
                  <p className="ml-28">
                    b. Post-Graduation Copies of the Degree Certificates from
                    the concerned University
                  </p>
                  {/* <div className="hidden print:block h-[270px]"></div> */}
                  <p className="ml-28">
                    c. Relieving Letter in Original from the previous employer
                  </p>
                  <p className="ml-28">
                    d. Pay slips for the last three months
                  </p>
                  <p className="ml-28">
                    e. Previous employer Copies of Services Certificates from
                    the last two Companies
                  </p>
                  <p className="ml-28">f. Health Insurance Details</p>
                  <p className="ml-28">g. Passport size photos – 6(Self)</p>
                  <p className="ml-28">
                    h. PAN Card copy Address Proof (2copies)
                  </p>
                  <p className="ml-28">
                    i. Passport copy (if available) and Driving License (if
                    available)
                  </p>
                  <p className="m-6 mt-2">
                    This offer is contingent upon detailed background
                    verification of all the information and documents that you
                    would be submitting to us and the client’s assignment. You
                    may email the acceptance of the letter or deliver it in
                    person to our Hyderabad Office located at JSP Imperia
                    building, 3rd floor, Street No-3, Pathrika Nagar, Hi-tech
                    City, Madhapur, and Hyderabad–500081. If you have any
                    questions regarding this offer, please do not hesitate to
                    contact us (040) 40068214.
                  </p>

                  <p className="m-6 mt-2">
                    We are enthusiastic about your joining our Information
                    Technology experts’ team at ACCENTIQA SYSTEMS PVT LTD and
                    believe your contributions, expertise, and attitude will be
                    greatly appreciated by the Organization.
                  </p>
                </section>
                
                <div className="text-left m-6 mt-10  ">
                  <p className="font-bold">Best Regards,</p>
                  <p className="font-bold my-2">
                    For ACCENTIQA SYSTEMS PRIVATE LIMITED
                  </p>
                  <img src={sign} alt="" />
                  <p className="font-bold my-2">Radhika K</p>
                  <p className="text-base">Director</p>
                  <p className="font-bold">ACCENTIQA SYSTEMS PRIVATE LIMITED</p>
                </div>
                <section className="page">
                <div className="hidden print:block h-[150px]"></div>
                <p className="m-6 mt-10">
                  I,{" "}
                  <b className="capitalize"> 
                    {empData?.empBasicInfo?.fname}{" "}
                    {empData?.empBasicInfo?.lname}
                  </b>
                  , do hereby agree to the terms of employment offered herein:
                </p>

                <div className="pl-5 flex justify-between mt-20 ">
                  <span className="font-semibold">Signature</span>
                  <span className="font-semibold mr-40">Date: </span>
                </div>
                </section>
              </div>
            </div>
            <div className="print-only">
              <footer className="hidden print:block text-zinc-500 text-center p-4 fixed  inset-x-0 bottom-0">
                <div className=" flex flex-col justify-center items-center fixed inset-x-0 bottom-5">
                  <span className="text-sm text-zinc-500">
                    ACCENTIQA SYSTEMS PRIVATE LIMITED
                  </span>
                  <span className="text-2xs text-zinc-500">
                    JSP Imperia Building,3rd Floor, Street No 3, Patrikanagar,
                    Madhapor,500081, Hyderabad, Telangana Phone 040-40068214
                  </span>
                </div>
              </footer>
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

            {/* <footer className="hidden print:block text-zinc-500 text-center p-4 fixed  inset-x-0 bottom-0">
            <div className="flex flex-col justify-center items-center">
              <span className="text-sm text-zinc-500">
                ACCENTIQA SYSTEMS PRIVATE LIMITED
              </span>
              <span className="text-2xs text-zinc-500">
                JSP Imperia Building,3rd Floor, Street No 3, Patrikanagar,
                Madhapor,500081, Hyderabad, Telangana Phone 040-40068214
              </span>
            </div>
          </footer> */}
            {/* <footer className="hidden print:block text-zinc-500 text-center p-4 fixed  inset-x-0 bottom-0"> */}
            {/* {generateFooter()} */}
            {/* </footer> */}
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
}
