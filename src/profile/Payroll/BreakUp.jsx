import React, { useState, useEffect, useLayoutEffect } from "react";
import { validateBreakUp } from "./validateBreakUp";
import { useFormValidation } from "../../hooks/useFormValidation";
import * as FormElements from "../../components/ui/FormElements";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { instance } from "../../components/Url";
import { useAuthContext } from "../../contexts/AuthContext";

export default function BreakUp() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [mainSalary, setMainSalary] = useState(0);
    const [allSalary, setAllSalary] = useState(null)
    const [years, setYears] = useState([])
    const { user } = useAuthContext()
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const dateOfJoining = state?.data?.empBasicInfo?.doj;
    const [months,setMonths]=useState([])
    const monthsAfterDOJ = [
        { value: 0, title: "Month" },
        { value: 1, title: "January", ewd: 31 },
        { value: 2, title: "February", ewd: 29 },
        { value: 3, title: "March", ewd: 31 },
        { value: 4, title: "April", ewd: 30 },
        { value: 5, title: "May", ewd: 31 },
        { value: 6, title: "June", ewd: 30 },
        { value: 7, title: "July", ewd: 31 },
        { value: 8, title: "August", ewd: 31 },
        { value: 9, title: "September", ewd: 30 },
        { value: 10, title: "October", ewd: 31 },
        { value: 11, title: "November", ewd: 30 },
        { value: 12, title: "December", ewd: 31 },
    ]
    useLayoutEffect(() => {
        let salaryArray;
        instance.get(`/api/v1/auth/myhikes/`)
            .then(async (response) => {
                salaryArray = response.data;
                salaryArray.push({
                    newSalary: parseInt(state?.data?.empBasicInfo?.salary),
                    date: state?.data?.empBasicInfo?.doj,
                })

                await salaryArray.sort((a, b) => {
                    return a.date - b.date;
                })

                // setMainSalary(salaryArray[0].newSalary);

                const yearsArray = [];
                const currentYear = new Date().getFullYear();
                const joinYear = state?.data?.empBasicInfo?.doj ? new Date(state.data.empBasicInfo.doj).getFullYear() : null;

                for (let i = joinYear; i <= currentYear; i++) {
                    yearsArray.push({ id: i, name: i });
                }

                setYears(yearsArray)
                setAllSalary(salaryArray)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [state])




    const handleCompute = () => {
        if (mainSalary <= 0) return;

        let basicSalary = 0;
        let hra = 0;
        let medicalAll = 1250;
        let transportAll = 1600;
        let specialAll = 0;
        let lta = 0;
        let cea = 0;
        let variablePay = 0;
        let grossSalary = 0;
        let gratuity = 0;
        let empPfCon = 1800;
        let retirementBenefits = 0;
        let ctc = 0;
        let empPf = 1800;
        let pt = 200;
        let foodCoupon = 0;
        let loan = 0;
        let insurance = 0;
        let tds = 0;
        let others = 0;
        let takeHome = 0;

        basicSalary = Math.round(parseInt(mainSalary) * 0.5);
        hra = Math.round(basicSalary * 0.5);
        specialAll = Math.round(
            parseInt(mainSalary) -
            (basicSalary + hra + medicalAll + transportAll + lta + cea)
        );
        grossSalary = Math.round(
            basicSalary + hra + medicalAll + transportAll + lta + cea + specialAll
        );
        variablePay = Math.round(basicSalary * 0.108);
        retirementBenefits = Math.round(gratuity + empPfCon);

        ctc = Math.round(grossSalary + variablePay + retirementBenefits);
        takeHome = Math.round(
            grossSalary - (empPf + pt + foodCoupon + loan + insurance + tds + others)
        );

        return {
            basicSalary,
            hra,
            lta,
            medicalAll,
            transportAll,
            cea,
            empPf,
            pt,
            tds,
            insurance,
            foodCoupon,
            loan,
            others,
            gratuity,
            empPfCon,
            specialAll,
            grossSalary,
            variablePay,
            retirementBenefits,
            ctc,
            takeHome,
        }
    };

    useEffect(() => {
        handleCompute();
    }, [mainSalary]);

    const navigateTo = () => {
        navigate("/profile/payroll/pay-slip", {
            state: {
                data: handleCompute(),
                empData: state.data,
                month:monthsAfterDOJ[selectedMonth],
                year: selectedYear,
            },
        });
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    function getNewSalaryForDate(hikes, year, month) {
        const selectedDate = new Date(year, month - 0);
        const filteredHikes = hikes.filter(h => {
            const hikeDate = new Date(h.date);
            return hikeDate <= selectedDate;
        });

        if (filteredHikes.length === 0) return null;

        const latestHike = filteredHikes.reduce((prev, curr) => {
            const prevDate = new Date(prev.date);
            const currDate = new Date(curr.date);
            return prevDate > currDate ? prev : curr;
        });

        return latestHike.newSalary;
    }


    useEffect(() => {
        if (selectedYear && selectedMonth && allSalary) {
            const salary = getNewSalaryForDate(allSalary, selectedYear, selectedMonth)
            if (salary) {
                setMainSalary(salary)
                console.log(mainSalary);
            }
        }

        let mArray=[{ value: 0, title: "Month" }]
        const joinMonth = new Date(dateOfJoining).getMonth() + 1;
        const joinYear = new Date(dateOfJoining).getFullYear();
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        if (joinYear === parseInt(selectedYear)) {
            if(joinYear===currentYear){
                for(let i=joinMonth;i<=currentMonth-1;i++){
                    mArray.push(monthsAfterDOJ[i])
                   }
            }else{
                for(let i=joinMonth;i<=12;i++){
                    mArray.push(monthsAfterDOJ[i])
                   }
            }
        }else if (currentYear === parseInt(selectedYear)) {
            mArray=[]
            for(let i=0;i<=currentMonth;i++){
                mArray.push(monthsAfterDOJ[i])
            }
        }else{
            for(let i=1;i<=12;i++){
                mArray.push(monthsAfterDOJ[i])
            }
        }
        setMonths(mArray)
    }, [selectedYear, selectedMonth])

    
    return (
        <div className="container mx-auto px-2">
            <p className="block tracking-wide text-zinc-600 text-2xl font-medium mr-2 mb-4">
                Salary  Breakup for <span className="font-semibold text-theme-1">{state?.data?.empBasicInfo?.fname} {state?.data?.empBasicInfo?.lname}</span>
            </p>
            <div className="flex py-4 ">

                <div className="relative inline-block">
                    {/* <YearsRange transferMonthData={transferMonthData} /> */}

                    <div className="flex gap-2 mt-4">
                        <FormElements.Select
                            optionsArray={[{ value: "", title: "Years" }, ...years]}
                            name="years"
                            value={selectedYear}
                            onChange={handleYearChange}
                        // error={errors.status}
                        />
                        <FormElements.Select
                            optionsArray={months}
                            name="months"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                        // error={errors.status}
                        />
                    </div>
                </div>
            </div>
            <Button
                disabled={selectedMonth===null||selectedYear===null}
                onClick={() => {
                    navigateTo();
                }}
            >
                Generate Pay Slip
            </Button>


        </div>
    );
}