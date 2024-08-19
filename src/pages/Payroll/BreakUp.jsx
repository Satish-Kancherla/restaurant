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
    const [readonly, setReadonly] = useState(true);
    const [allSalary, setAllSalary] = useState(null)
    const [years, setYears] = useState([])
    const { user } = useAuthContext()    
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const dateOfJoining = state?.data?.doj;
    // const monthsAfterDOJ = [
    //     { value: 0, title: "Month" },
    //     { value: 1, title: "January", ewd: 31 },
    //     { value: 2, title: "February", ewd: 29 },
    //     { value: 3, title: "March", ewd: 31 },
    //     { value: 4, title: "April", ewd: 30 },
    //     { value: 5, title: "May", ewd: 31 },
    //     { value: 6, title: "June", ewd: 30 },
    //     { value: 7, title: "July", ewd: 31 },
    //     { value: 8, title: "August", ewd: 31 },
    //     { value: 9, title: "September", ewd: 30 },
    //     { value: 10, title: "October", ewd: 31 },
    //     { value: 11, title: "November", ewd: 30 },
    //     { value: 12, title: "December", ewd: 31 },
    // ].filter((month, index) => {
    //     // if (!dateOfJoining) return true;
    //     // const joinMonth = new Date(dateOfJoining).getMonth() + 1;
    //     // return index >= joinMonth;
    //     if (!dateOfJoining) return true;
    //     const joinMonth = new Date(dateOfJoining).getMonth() + 1;
    //     const joinYear = new Date(dateOfJoining).getFullYear();
    //     const currentYear = new Date().getFullYear();
    //     const currentMonth = new Date().getMonth() + 1;
    
    //     if (joinYear === parseInt(selectedYear)) {
    //         return index >= joinMonth; // For joining year, include months from joining month onwards
    //     } else if (currentYear === parseInt(selectedYear)) {
    //         // Check if it's the current year and the month index is less than or equal to the current month
    //         return index <= currentMonth;
    //     } else {
    //         return true; // For other years, include all months
    //     }
    // });
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
        instance.get(`/api/v1/emp/emphikes/one/${state.data.id}`)
            .then(async (response) => {
                salaryArray = response.data;
                salaryArray.push({
                    newSalary: parseInt(state.data.salary),
                    date: state.data.doj,
                })

                await salaryArray.sort((a, b) => {
                    return a.date - b.date;
                })

                // setMainSalary(salaryArray[0].newSalary);

                const yearsArray = [];
                const currentYear = new Date().getFullYear();
                const joinYear = state?.data?.doj ? new Date(state?.data?.doj).getFullYear() : null;

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



    const onSubmit = (v) => {
        const updatedFormData = {
            ...v,
            basicSalary: parseInt(mainSalary) !== 0 ? parseInt(mainSalary) * 0.5 : 0,
            hra: v.basicSalary !== 0 ? v.basicSalary * 0.5 : 0,
        };
        setFormData(updatedFormData);
        return { status: 200 };
    };
    const { formData, errors, changeHandle, handleSubmit, cleanup, setFormData } =
        useFormValidation(
            {
                mainSalary: 0,
                basicSalary: 0,
                hra: 0,
                medicalAll: 1250,
                transportAll: 1600,
                specialAll: 0,
                lta: 0,
                cea: 0,
                variablePay: 0,
                grossSalary: 0,
                gratuity: 0,
                empPfCon: 1800,
                retirementBenefits: 0,
                ctc: 0,
                empPf: 1800,
                pt: 200,
                foodCoupon: 0,
                loan: 0,
                insurance: 0,
                tds: 0,
                others: 0,
                takeHome: 0,
            },
            onSubmit,
            validateBreakUp
        );

    const handleCompute = () => {
        if (mainSalary <= 0) return;
        if (!readonly) return;

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
        setFormData((prev) => ({
            ...prev,
            basicSalary,
            hra,
            specialAll,
            grossSalary,
            variablePay,
            retirementBenefits,
            ctc,
            takeHome,
        }));
    };

    const toggleReadOnly = () => {
        setReadonly(!readonly);
    };

    useEffect(() => {
        handleCompute();
    }, [mainSalary]);

    const navigateTo = () => {
        navigate("/dashboard/payroll/pay-slip", {
            state: {
                data: { ...formData, mainSalary },
                empinfo: state.data,
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
    

    useEffect(()=>{
        if(selectedYear&& selectedMonth&&allSalary){
          const salary = getNewSalaryForDate(allSalary,selectedYear,selectedMonth)
          if(salary){
            setMainSalary(salary)
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
    },[selectedYear,selectedMonth])
    return (
        <div className="container mx-auto px-2">
            <p className="block tracking-wide text-zinc-600 text-2xl font-medium mr-2 mb-4">
                Salary  Breakup for <span className="font-semibold text-theme-1">{state.data.name}</span>
            </p>
            <div className="flex justify-end ">
                <label class="inline-flex items-center cursor-pointer mr-10">
                    <input
                        type="checkbox"
                        value=""
                        checked={readonly}
                        class="sr-only peer"
                        onChange={() => {
                            toggleReadOnly();
                            handleCompute();
                        }}
                    />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Auto
                    </span>
                </label>
                <div className="relative inline-block">
                    {/* <YearsRange transferMonthData={transferMonthData} /> */}

                    <div className="flex gap-2 mt-4">
                        <FormElements.Select
                            optionsArray={[{ value: "", title: "Years" },...years]}
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

            <div className="break-up-form">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="Salary"
                        type="number"
                        name="mainSalary"
                        value={mainSalary}
                        onChange={(e) => {
                            const { value } = e.target;
                            setMainSalary(value);
                        }}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="Basic Salary"
                        type="number"
                        name="basicSalary"
                        value={formData.basicSalary}
                        onChange={(e) => {
                            changeHandle(e);
                        }}
                        error={errors.basicSalary}
                        readOnly={readonly}
                    />
                    <FormElements.Input
                        label="HRA"
                        type="number"
                        name="hra"
                        value={formData.hra}
                        onChange={changeHandle}
                        error={errors.hra}
                        readOnly={readonly}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="Medical Allowance"
                        type="number"
                        name="medicalAll"
                        value={formData.medicalAll}
                        onChange={changeHandle}
                        error={errors.medicalAll}
                        readOnly={readonly}
                    />
                    <FormElements.Input
                        label="Transport Allowance"
                        type="number"
                        name="transportAll"
                        value={formData.transportAll}
                        onChange={changeHandle}
                        error={errors.transportAll}
                        readOnly={readonly}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="LTA"
                        type="number"
                        name="lta"
                        value={formData.lta}
                        onChange={changeHandle}
                        error={errors.lta}
                        readOnly={readonly}
                    />
                    <FormElements.Input
                        label="CEA"
                        type="number"
                        name="cea"
                        value={formData.cea}
                        onChange={changeHandle}
                        error={errors.cea}
                        readOnly={readonly}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="Special Allowance"
                        type="number"
                        name="specialAll"
                        value={formData.specialAll}
                        onChange={changeHandle}
                        error={errors.specialAll}
                        readOnly={readonly}
                    />
                    <FormElements.Input
                        label="Monthly Gross Salary"
                        type="number"
                        name="grossSalary"
                        value={formData.grossSalary}
                        onChange={changeHandle}
                        error={errors.grossSalary}
                        readOnly={readonly}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="Variable Pay"
                        type="number"
                        name="variablePay"
                        value={formData.variablePay}
                        onChange={changeHandle}
                        error={errors.variablePay}
                        readOnly={readonly}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="Gratuity"
                        type="number"
                        name="gratuity"
                        value={formData.gratuity}
                        onChange={changeHandle}
                        error={errors.gratuity}
                        readOnly={readonly}
                    />
                    <FormElements.Input
                        label="Employer PF Contribution"
                        type="number"
                        name="empPfCon"
                        value={formData.empPfCon}
                        onChange={changeHandle}
                        error={errors.empPfCon}
                        readOnly={readonly}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="Retirement Benefits"
                        type="number"
                        name="retirementBenefits"
                        value={formData.retirementBenefits}
                        onChange={changeHandle}
                        error={errors.retirementBenefits}
                        readOnly={readonly}
                    />
                    <FormElements.Input
                        label="CTC"
                        type="number"
                        name="ctc"
                        value={formData.ctc}
                        onChange={changeHandle}
                        error={errors.ctc}
                        readOnly={readonly}
                    />
                </div>
                <p className="block tracking-wide text-zinc-600 text-2xl font-bold mr-2 mb-4">
                    Monthly Deductions
                </p>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="Employee PF"
                        type="number"
                        name="empPf"
                        value={formData.empPf}
                        onChange={changeHandle}
                        error={errors.empPf}
                        readOnly={readonly}
                    />
                    <FormElements.Input
                        label="PT"
                        type="number"
                        name="pt"
                        value={formData.pt}
                        onChange={changeHandle}
                        error={errors.pt}
                        readOnly={readonly}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="Food Coupon"
                        type="number"
                        name="foodCoupon"
                        value={formData.foodCoupon}
                        onChange={changeHandle}
                        error={errors.foodCoupon}
                        readOnly={readonly}
                    />
                    <FormElements.Input
                        label="Loan"
                        type="number"
                        name="loan"
                        value={formData.loan}
                        onChange={changeHandle}
                        error={errors.loan}
                        readOnly={readonly}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="Insurance"
                        type="number"
                        name="insurance"
                        value={formData.insurance}
                        onChange={changeHandle}
                        error={errors.insurance}
                        readOnly={readonly}
                    />
                    <FormElements.Input
                        label="TDS"
                        type="number"
                        name="tds"
                        value={formData.tds}
                        onChange={changeHandle}
                        error={errors.tds}
                        readOnly={readonly}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label="Other Deductions"
                        type="number"
                        name="others"
                        value={formData.others}
                        onChange={changeHandle}
                        error={errors.others}
                        readOnly={readonly}
                    />
                    <FormElements.Input
                        label="Monthly Take Home"
                        type="number"
                        name="takeHome"
                        value={formData.takeHome}
                        onChange={changeHandle}
                        error={errors.takeHome}
                        readOnly={readonly}
                    />
                </div>
                <Button
                disabled={selectedMonth===null||selectedYear===null}
                    onClick={() => {
                        handleSubmit();
                        navigateTo();
                    }}
                >
                    Generate Pay Slip
                </Button>
            </div>
        </div>
    );
}