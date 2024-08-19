import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useLayoutEffect, useState } from "react";
import { SearchableSelect } from "../../components/ui/FormElements";
import { instance } from "../../components/Url";
import { useAuthContext } from "../../contexts/AuthContext";
export default function OneTimeAccess() {
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
                                        
                                    }}
                                >
                                    <div className="select-none">
                                        <div className="text-sm">Generate Token</div>
                                    </div>
                                </Button>
                               
                            </div>
                        }
                    </>
                } />
            </Routes>

        </div>
    );
}
