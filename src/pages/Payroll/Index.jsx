import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import PaySlip from "./PaySlip";
import BreakUp from "./BreakUp";
import { useLayoutEffect, useState } from "react";
import { SearchableSelect } from "../../components/ui/FormElements";
import { instance } from "../../components/Url";
import { useAuthContext } from "../../contexts/AuthContext";
import HikesTable from "./HikesTable";
import Loading from "../../components/ui/Loading";
import EmployeeSalaryCalculator from "./EmployeeSalaryCalculator";
import Experience from "../Certificates/Experience";
import Probation from "../Certificates/Probation";
import OfferLetter from "../Certificates/OfferLetter";
import Certificates from "../Certificates/Index";
import Trainee from "../Certificates/Trainee";
export default function Payroll() {
    const [selectedEmp, setSelectedEmp] = useState();
    const [allEmp, setAllEmp] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const { user } = useAuthContext();
    const fetchEmp = async () => {
        await instance
            .get("/api/v1/emp/employee/all")
            .then((response) => {
                const filtereddata = response.data.map((obj, index) => {
                    return {
                        id: obj.empNo,
                        name: obj.fname + " " + obj.lname,
                        salary: obj.salary,
                        doj: obj.doj

                    };
                })
                setAllEmp(filtereddata)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false)
            });
    };
    useLayoutEffect(() => {
        fetchEmp();
    }, []);

    // if (isLoading)
    //     return <Loading className='min-h-32'/>
    // else

    return (
        <div className="bg-white rounded-lg shadow-sm p-4  ">
            <Routes>
                <Route path="/" element={
                    <>
                        <SearchableSelect
                            label="Select employee"
                            value={selectedEmp}
                            onChange={(e) => { setSelectedEmp(e.target.value) }}
                            options={[{ id: "", name: "Select ..." }, ...allEmp]}
                        >

                        </SearchableSelect>
                        {
                            selectedEmp &&
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => {
                                        navigate('/dashboard/payroll/trainee', {
                                            state: {
                                                data: allEmp.find((emp) => { return emp.id === selectedEmp })
                                            }
                                        })
                                    }}
                                >
                                    <div className="select-none">
                                        <div className="text-sm">Trainee Employement</div>
                                        <div className="text-2xs leading-[8px] text-theme-text/60">Offer Letter</div>
                                    </div>
                                </Button>
                                <Button
                                    onClick={() => {
                                        navigate('/dashboard/payroll/offerletter', {
                                            state: {
                                                data: allEmp.find((emp) => { return emp.id === selectedEmp })
                                            }
                                        })
                                    }}
                                >
                                    <div className="select-none">
                                        <div className="text-sm">Employement</div>
                                        <div className="text-2xs leading-[8px] text-theme-text/60">Offer Letter</div>
                                    </div>
                                </Button>

                                <Button
                                    onClick={() => {
                                        navigate('/dashboard/payroll/probation', {
                                            state: {
                                                data: allEmp.find((emp) => { return emp.id === selectedEmp })
                                            }
                                        })
                                    }}
                                >
                                    Probation Letter
                                </Button>
                                <Button
                                    onClick={() => {
                                        navigate('/dashboard/payroll/experience', {
                                            state: {
                                                data: allEmp.find((emp) => { return emp.id === selectedEmp })
                                            }
                                        })
                                    }}
                                >
                                    Experience Letter
                                </Button>
                                <Button
                                    onClick={() => {
                                        navigate('/dashboard/payroll/break-up', {
                                            state: {
                                                data: allEmp.find((emp) => { return emp.id === selectedEmp })
                                            }
                                        })
                                    }}
                                >
                                    <div className="select-none">
                                        <div className="text-sm">Salary Breakup</div>
                                        <div className="text-2xs leading-[8px] text-theme-text/60">And generate Payslip</div>
                                    </div>
                                </Button>
                                {/* <Button
                                    onClick={() => {
                                        navigate('/dashboard/payroll/hikes', {
                                            state: {
                                                data: allEmp.find((emp) => { return emp.id === selectedEmp })
                                            }
                                        })
                                    }}
                                >
                                    Hikes
                                </Button> */}
                                {/* <Button
                                    onClick={() => {
                                        navigate('/dashboard/payroll/employee-salary', {
                                            state: {
                                                data: allEmp.find((emp) => { return emp.id === selectedEmp })
                                            }
                                        })
                                    }}
                                >

                                    <div className="select-none">
                                        <div className="text-sm">Salary Paid</div>
                                        <div className="text-2xs leading-[8px] text-theme-text/60">Till Now</div>
                                    </div>
                                </Button> */}
                            </div>
                        }
                    </>
                } />
                <Route path='/break-up' element={<BreakUp />} />
                <Route path='/pay-slip' element={<PaySlip />} />
                <Route path='/employee-salary' element={<EmployeeSalaryCalculator />} />
                <Route path='/hikes' element={<HikesTable />} />
                <Route path='/certificates' element={<Certificates />} />
                <Route path='/experience' element={<Experience />} />
                <Route path='/probation' element={<Probation />} />
                 <Route path='/trainee' element={<Trainee />} />
                <Route path='/offerletter' element={<OfferLetter />} />
            </Routes>

        </div>
    );
}
