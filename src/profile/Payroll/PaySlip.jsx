import React, {  useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useLocation } from "react-router-dom";
import { Download, IndianRupee } from "lucide-react";
import Button from "../../components/ui/Button";
import acqlogo from "../../assets/logo.svg";
import { ToWords } from 'to-words';

export default function PaySlip() {
    const location = useLocation();
    const { data, empData,month,year } = location.state || {}; // Accessing data safely
   
    const contentRef = useRef(null);

    const conponentPDF= useRef(); 

    const generatePDF= useReactToPrint({
      content: ()=>conponentPDF.current,
      documentTitle:"Pay-Slip",
     
  });

    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
          currency: true,
          ignoreDecimal: false,
          ignoreZeroCurrency: false,
          doNotAddOnly: false,
          currencyOptions: {
            // can be used to override defaults for the selected locale
            name: 'Rupee',
            plural: 'Rupees',
            symbol: '₹',
            fractionalUnit: {
              name: 'Paisa',
              plural: 'Paise',
              symbol: '',
            },
          },
        },
      });
 
    return (
        <div className="">
            <div className="p-2" id="content-convert" ref={conponentPDF}>
                <div className="container border-2 border-zinc-600">
                    <div className="grid grid-cols-1 p-2">
                        <div className="text-center">
                            <div className="absolute grid place-items-start">
                                <img className="h-10 text-start" src={acqlogo} alt="" />
                            </div>
                            <p className="block tracking-wide text-zinc-600 text-xl font-bold">
                                ACCENTIQA SYSTEMS PRIVATE LIMITED
                            </p>
                            <p className="block tracking-wide text-zinc-600 text-sm ">
                                # JSP IMPERIA,3rd Floor,Street No - 3,Pathrikanagar,Hi-Tech
                                city,Madhapur,Hyderabad,Telangana
                            </p>
                            <p className="block tracking-wide text-zinc-600 text-lg font-bold mt-5">
                                Pay Slip For The Month Of {month.title}, {year}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="border-t-2 border-r-2 border-zinc-600 p-2">
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">Name:</p>
                                <p className="text-zinc-600 text-sm text-right">{empData?.empBasicInfo?.fname} {empData?.empBasicInfo?.lname}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">Joining Date:</p>
                                <p className="text-zinc-600 text-sm text-right">{empData?.empBasicInfo?.doj.split("-").reverse().join("-")}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">Designation:</p>
                                <p className="text-zinc-600 text-sm text-right">{empData?.empPosition?.designation.name}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">Department:</p>
                                <p className="text-zinc-600 text-sm text-right">{empData?.empPosition?.department.name}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">Location:</p>
                                <p className="text-zinc-600 text-sm text-right">{empData?.empPosition?.location.name}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">Effective Work days:</p>
                                <p className="text-zinc-600 text-sm text-right">xxxxx</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">LOP:</p>
                                <p className="text-zinc-600 text-sm text-right">0</p>
                            </div>
                        </div>
                        <div className="border-t-2 border-zinc-600 p-2">
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">Employe No:</p>
                                <p className="text-zinc-600 text-sm text-right">{empData?.empBasicInfo?.empNo}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">Bank Name:</p>
                                <p className="text-zinc-600 text-sm text-right">{empData?.empPayment?.bankName}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">Bank Account No:</p>
                                <p className="text-zinc-600 text-sm text-right">{empData?.empPayment?.accountNumber}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">PAN No:</p>
                                <p className="text-zinc-600 text-sm text-right">{empData?.empStatutory?.panNo}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="text-zinc-600 text-sm">PF UAN:</p>
                                <p className="text-zinc-600 text-sm text-right">{empData?.empStatutory?.uanNo}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="border-t-2 border-r-2 border-zinc-600 ">
                        <div className="grid grid-cols-6 border-b-2 border-zinc-600 p-2">
                                <p className="block tracking-wide text-zinc-600 text-md font-semibold col-start-1 col-span-4">
                                    Earnings
                                </p>
                                <p className="block tracking-wide text-zinc-600 text-md font-semibold ">
                                    Full &#40;<IndianRupee className="inline w-3"/>&#41;
                                </p>
                                <p className="block tracking-wide text-zinc-600 text-md font-semibold">
                                    Actual &#40;<IndianRupee className="inline w-3"/>&#41;
                                </p>
                            </div>
                            <div className="grid grid-cols-6 px-5 pt-2">
                                <p className="text-zinc-600 text-sm col-start-1 col-span-4">BASIC</p>
                                <p className="text-zinc-600 text-sm ">{data?.basicSalary}</p>
                                <p className="text-zinc-600 text-sm">{data?.basicSalary}</p>
                            </div>
                            <div className="grid grid-cols-6 px-5">
                                <p className="text-zinc-600 text-sm col-start-1 col-span-4">HRA</p>
                                <p className="text-zinc-600 text-sm">{data?.hra}</p>
                                <p className="text-zinc-600 text-sm">{data?.hra}</p>
                            </div>
                            <div className="grid grid-cols-6 px-5">
                                <p className="text-zinc-600 text-sm col-start-1 col-span-4">MEDICAL ALLOWANCE</p>
                                <p className="text-zinc-600 text-sm">{data?.medicalAll}</p>
                                <p className="text-zinc-600 text-sm">{data?.medicalAll}</p>
                            </div>
                            <div className="grid grid-cols-6 px-5">
                                <p className="text-zinc-600 text-sm col-start-1 col-span-4">CONVEYANCE</p>
                                <p className="text-zinc-600 text-sm">0</p>
                                <p className="text-zinc-600 text-sm">0</p>
                            </div>
                            <div className="grid grid-cols-6 px-5">
                                <p className="text-zinc-600 text-sm col-start-1 col-span-4">LTA</p>
                                <p className="text-zinc-600 text-sm">{data?.lta}</p>
                                <p className="text-zinc-600 text-sm">{data?.lta}</p>
                            </div>
                            <div className="grid grid-cols-6 px-5">
                                <p className="text-zinc-600 text-sm col-start-1 col-span-4">SPECIAL ALLOWANCE</p>
                                <p className="text-zinc-600 text-sm">{data?.specialAll}</p>
                                <p className="text-zinc-600 text-sm">{data?.specialAll}</p>
                            </div>
                            <div className="grid grid-cols-6 px-5 pb-5">
                                <p className="text-zinc-600 text-sm col-start-1 col-span-4">TRANSPORT ALLOWANCE</p>
                                <p className="text-zinc-600 text-sm">{data?.transportAll}</p>
                                <p className="text-zinc-600 text-sm">{data?.transportAll}</p>
                            </div>
                        </div>
                        <div className="border-t-2 border-zinc-600">
                            <div className=" border-zinc-600 ">
                                <div className="grid grid-cols-6 border-b-2 border-zinc-600 p-2">
                                    <p className="block tracking-wide text-zinc-600 text-md font-semibold col-start-1 col-span-5">
                                        Deductions &#40;<IndianRupee className="inline w-3"/>&#41;
                                    </p>
                                    <p className="block tracking-wide text-zinc-600 text-md font-semibold">
                                        Actual &#40;<IndianRupee className="inline w-3"/>&#41;
                                    </p>
                                </div>
                                <div className="grid grid-cols-6 px-5 pt-2">
                                    <p className="text-zinc-600 text-sm col-start-1 col-span-5">PF</p>
                                    <p className="text-zinc-600 text-sm">{data?.empPf}</p>
                                </div>
                                <div className="grid grid-cols-6 px-5">
                                    <p className="text-zinc-600 text-sm col-start-1 col-span-5">PROF TAX</p>
                                    <p className="text-zinc-600 text-sm">{data?.pt}</p>
                                </div>
                                <div className="grid grid-cols-6 px-5">
                                    <p className="text-zinc-600 text-sm col-start-1 col-span-5">TDS</p>
                                    <p className="text-zinc-600 text-sm">{data?.tds}</p>
                                </div>
                                <div className="grid grid-cols-6 px-5">
                                    <p className="text-zinc-600 text-sm col-start-1 col-span-5">INSURANCE</p>
                                    <p className="text-zinc-600 text-sm">{data?.insurance}</p>
                                </div>
                                <div className="grid grid-cols-6 px-5">
                                    <p className="text-zinc-600 text-sm col-start-1 col-span-5">OTHER DEDUCTIONS</p>
                                    <p className="text-zinc-600 text-sm">{data?.others}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-t-2 border-r-2 border-zinc-600">
                            <div className="grid grid-cols-6 border-b-2 border-zinc-600 p-2">
                                <p className="block tracking-wide text-zinc-600 text-md font-semibold col-start-1 col-span-4">
                                    Total Earnings:
                                </p>
                                <p className=" tracking-wide text-zinc-600 text-sm font-semibold flex items-center">
                                <IndianRupee className="h-3 inline p-0 -m-1.5" /> {data?.basicSalary+data?.hra+data?.lta+data?.specialAll+data?.medicalAll+data?.transportAll}
                                </p>
                                <p className="flex tracking-wide text-zinc-600 text-sm font-semibold items-center">
                                <IndianRupee className="h-3 inline p-0 -m-1.5" /> {data?.basicSalary+data?.hra+data?.lta+data?.specialAll+data?.medicalAll+data?.transportAll}
                                </p>
                            </div>
                        </div>
                        <div className="border-t-2 border-zinc-600">
                            <div className="grid grid-cols-6 border-b-2 border-zinc-600 p-2">
                                <p className="block tracking-wide text-zinc-600 text-md font-semibold col-start-1 col-span-5">
                                    Total Deductions:
                                </p>
                                <p className="block tracking-wide text-zinc-600 text-sm font-semibold">
                                <IndianRupee className="h-3 inline p-0 -m-1.5" />{data?.empPf+data?.pt+data?.tds+data?.insurance+data?.others}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 p-2">
                        <p className=" text-zinc-600 text-md mb-2 ">
                            Net Pay for the month(Total Earnings - Total Deductions): 
                            <span className="font-bold ml-4 i"><IndianRupee className="h-4 inline -m-1.5" />
                                {
                                    (data?.basicSalary+data?.hra+data?.lta+data?.specialAll+data?.medicalAll+data?.transportAll)
                                    -
                                    (data?.empPf+data?.pt+data?.tds+data?.insurance+data?.others)
                                }
                                {

                                }

                            </span>
                        </p>
                        <p className=" text-zinc-600 text-sm">
                            
                        {toWords.convert(parseInt((data?.basicSalary+data?.hra+data?.lta+data?.specialAll+data?.medicalAll+data?.transportAll)
                                    -
                                    (data?.empPf+data?.pt+data?.tds+data?.insurance+data?.others) ||0))}
                        </p>
                    </div>
                </div>
                <p className=" text-zinc-600 text-sm text-center">
                    This is system generated payslip and does not require signature.
                </p>
            </div>
            <Button iconleft={<Download className="mr-2" />} className=" py-2 px-4 my-10 " onClick={generatePDF}>Download PDF</Button>
        </div>
    );
}
