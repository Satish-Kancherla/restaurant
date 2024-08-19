import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import PaySlip from "./PaySlip";
import BreakUp from "./BreakUp";
import { useLayoutEffect, useState } from "react";
import { SearchableSelect } from "../../components/ui/FormElements";
import { instance } from "../../components/Url";
import { useAuthContext } from "../../contexts/AuthContext";
import Loading from "../../components/ui/Loading";
export default function Payroll() {
    const [currentEmp, setCurrentEmp] = useState();
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();

    const { user } = useAuthContext();
    const fetchEmp = async () => {
        await instance
            .get("/api/v1/auth/userempinfo")
            .then((response) => {
                setCurrentEmp(response.data);
                console.log("response",response.data);
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


    if(isLoading){
        return <Loading/>
    }
    else
    return (
        <div className="bg-white p-2 rounded-lg shadow-sm  ">



            <Routes>
                <Route path="/" element={
                    <>
                        <div className="flex">
                            <Button
                                onClick={() => {
                                    navigate('/profile/payroll/break-up', {
                                        state: {
                                            data:currentEmp
                                        }
                                    })
                                }}
                            >
                                <div className="select-none">
                                    <div className="text-sm">Salary Breakup</div>
                                    <div className="text-2xs leading-[8px] text-theme-text/60">And generate Payslip</div>
                                </div>
                            </Button>
                        </div>
                    </>
                } />
                <Route path='/break-up' element={<BreakUp />} />
                <Route path='/pay-slip' element={<PaySlip />} />
            </Routes>

        </div>
    );
}
