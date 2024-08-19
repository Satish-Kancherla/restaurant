import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "../../components/ui/Button";
import { Download } from "lucide-react";
import EmployeeRow from "./EmployeeRow";
import * as FormElements from "../../components/ui/FormElements";
const employees = [
  {
    id: 1,
    name: "John Doe",
    salary: 50000,
    resignationDate: "2024-03-25",
    exitDate: "2024-04-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    salary: 60000,
    resignationDate: "2024-03-20",
    exitDate: "2024-04-05",
  },
  // Add more employee data with exit dates
  {
    id: 3,
    name: "Alice Johnson",
    salary: 55000,
    resignationDate: "2024-03-15",
    exitDate: "2024-03-31",
  },
  {
    id: 4,
    name: "Bob Williams",
    salary: 58000,
    resignationDate: "2024-03-10",
    exitDate: "2024-03-25",
  },
  {
    id: 5,
    name: "Eva Brown",
    salary: 52000,
    resignationDate: "2024-03-05",
    exitDate: "2024-03-20",
  },
  {
    id: 6,
    name: "Michael Davis",
    salary: 65000,
    resignationDate: "2024-03-01",
    exitDate: "2024-03-15",
  },
  {
    id: 7,
    name: "Olivia Martinez",
    salary: 70000,
    resignationDate: "2024-02-25",
    exitDate: "2024-03-10",
  },
  {
    id: 8,
    name: "William Miller",
    salary: 75000,
    resignationDate: "2024-02-20",
    exitDate: "2024-03-05",
  },
  {
    id: 9,
    name: "Sophia Wilson",
    salary: 62000,
    resignationDate: "2024-02-15",
    exitDate: "2024-02-29",
  },
  {
    id: 10,
    name: "Liam Anderson",
    salary: 58000,
    resignationDate: "2024-02-10",
    exitDate: "2024-02-25",
  },
];
export default function EmployeeStatus() {
  const[filterdata,setFilterdata]= useState(employees);
  const [filterRow, setFilterRow]= useState(filterdata); 

  const contentRef = useRef(null);

  
  const handlesearch =(e)=>{
    setFilterRow(filterdata.filter(item =>item.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const conponentPDF= useRef(); 

  const generatePDF= useReactToPrint({
    content: ()=>conponentPDF.current,
    documentTitle:"Pay-Slip",
   
});
  return (
    <div className="">
      <div className="mt-40">
      <FormElements.Input
                        label={<span className="text-base">Search Name</span>}
                        type="text"
                        className="w-56 h-8 mt-20" 
                        name="search"
                        onChange={handlesearch}
                       placeholder="Search..."
                    />
      <div className="m-4" id="content-convert" ref={conponentPDF}>
        <p className="block tracking-wide text-zinc-800 text-2xl font-bold mr-2 mb-4">
          Resigned-Employee-Salaries
        </p>
       
        <table className="text-sm min-w-full text-zinc-800 border-spacing-0 border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="pl-2 pb-2 border border-slate-300">Name</th>
              <th className="pl-2 pb-2 border border-slate-300">Salary</th>
              <th className="pl-2 pb-2 border border-slate-300">
                Resignation Date
              </th>
              <th className="pl-2 pb-2 border border-slate-300">Exit Date</th>
              <th className="pl-2 pb-2 border border-slate-300">
                Remaining Salary
              </th>
            </tr>
          </thead>
          <tbody>
            {filterRow.map((employee) => (
              <EmployeeRow key={employee.id} employee={employee} />
            ))}
          </tbody>
        </table>
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
