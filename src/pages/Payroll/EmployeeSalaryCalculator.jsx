import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { instance } from "../../components/Url";
import { useReactToPrint } from "react-to-print";
import Button from "../../components/ui/Button";
import { Download } from "lucide-react";
const EmployeeSalaryCalculator = () => {
  const { state } = useLocation();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [empHikes, setEmpHikes] = useState([]);
  function fetchEmpHikes() {
    instance
      .get(`/api/v1/emp/emphikes/one/${state.data.id}`)
      .then((response) => {
        setEmpHikes(response.data);

        setIsLoading(false);
        console.log("hikes", response.data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  useLayoutEffect(() => {
    fetchEmpHikes();
  }, []);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees([
      {
        id: 1,
        name: state.data.name,
        salary: state.data.salary,
        joiningDate: state.data.doj,
        hikes: empHikes.sort((a, b) => new Date(a.date) - new Date(b.date)),
      },
    ]);
  }, [empHikes]);
  console.log(employees);
  // const [employees, setEmployees] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     salary: 50000,
  //     joiningDate: "2020-01-01",
  //     hikes: [
  //       { date: "2021-01-01", newSalary: 55000 },
  //       { date: "2022-01-01", newSalary: 60000 },
  //       { date: "2023-01-01", newSalary: 65000 },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     salary: 60000,
  //     joiningDate: "2019-05-15",
  //     hikes: [
  //       { date: "2020-05-15", newSalary: 65000 },
  //       { date: "2021-05-15", newSalary: 70000 },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Alice Johnson",
  //     salary: 55000,
  //     joiningDate: "2018-11-20",
  //   },
  //   {
  //     id: 4,
  //     name: "Bob Brown",
  //     salary: 52000,
  //     joiningDate: "2017-07-10",
  //   },
  //   {
  //     id: 5,
  //     name: "Michael Lee",
  //     salary: 51000,
  //     joiningDate: "2019-02-28",
  //     hikes: [{ date: "2020-02-28", newSalary: 54000 }],
  //   },
  //   {
  //     id: 6,
  //     name: "Emily Davis",
  //     salary: 53000,
  //     joiningDate: "2019-09-12",
  //   },
  //   {
  //     id: 7,
  //     name: "David Wilson",
  //     salary: 52000,
  //     joiningDate: "2020-08-05",
  //     hikes: [{ date: "2021-08-05", newSalary: 55000 }],
  //   },
  //   {
  //     id: 8,
  //     name: "Emma Martinez",
  //     salary: 60000,
  //     joiningDate: "2021-03-18",
  //   },
  //   {
  //     id: 9,
  //     name: "William Taylor",
  //     salary: 58000,
  //     joiningDate: "2018-04-25",
  //     hikes: [
  //       { date: "2019-04-25", newSalary: 60000 },
  //       { date: "2020-04-25", newSalary: 62000 },
  //     ],
  //   },
  //   {
  //     id: 10,
  //     name: "Olivia Anderson",
  //     salary: 54000,
  //     joiningDate: "2021-01-15",
  //   },
  //   // Add more employee data here...
  // ]);

  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day);
  };

  const calculateTotalSalary = (employee) => {
    const currentDate = new Date();
    let totalSalary = 0;

    if (employee.hikes && employee.hikes.length > 0) {
      let prevHikeDate = parseDate(employee.joiningDate);
      let prevSalary = employee.salary;

      for (const hike of employee.hikes) {
        const hikeDate = parseDate(hike.date);
        const hikeDuration =
          (hikeDate - prevHikeDate) / (1000 * 60 * 60 * 24 * 30.417); // Approximate months
        const hikeSalary = hikeDuration * prevSalary;
        totalSalary += hikeSalary;
        prevHikeDate = hikeDate;
        prevSalary = hike.newSalary;
      }

      // Calculate salary after the last hike
      const lastHikeDuration =
        (currentDate - prevHikeDate) / (1000 * 60 * 60 * 24 * 30.417); // Approximate months
      totalSalary += lastHikeDuration * prevSalary;
    } else {
      // If there are no hikes, calculate salary from joining date to present date
      const employmentDuration =
        (currentDate - parseDate(employee.joiningDate)) /
        (1000 * 60 * 60 * 24 * 30.417); // Approximate months
      totalSalary = employee.salary * employmentDuration;
    }

    return totalSalary.toFixed(2);
  };

  const conponentPDF= useRef(); 

  const generatePDF= useReactToPrint({
    content: ()=>conponentPDF.current,
    documentTitle:"Pay-Slip",
   
});
  return (
    <div className="">
      <div className="" id="content-convert" ref={conponentPDF}>
        <p className="block tracking-wide text-zinc-800 text-2xl font-bold mr-2 mb-4">
          Employee Salaries
        </p>
        <table className="text-sm min-w-full text-zinc-800 border-spacing-0 border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="pl-2 pb-2 border border-slate-300">Name</th>
              <th className="pl-2 pb-2 border border-slate-300">
                Joining Salary
              </th>
              <th className="pl-2 pb-2 border border-slate-300">
                Current Salary
              </th>
              <th className="pl-2 pb-2 border border-slate-300">
                Joining Date
              </th>
              <th className="pl-2 pb-2 border border-slate-300">Hikes (In Percentage)</th>
              <th className="pl-2 pb-2 border border-slate-300">
                Salary Including Hikes
              </th>
              <th className="pl-2 pb-2 border border-slate-300">Days</th>
              <th className="pl-2 pb-2 border border-slate-300">Months</th>
              <th className="pl-2 pb-2 border border-slate-300">
                Salary Calculation (Aprox)
              </th>
              <th className="pl-2 pb-2 border border-slate-300">
                Total Salary (Aprox)
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              const currentDate = new Date(); // Define currentDate here for each iteration
              const employmentDuration = Math.floor(
                (currentDate - new Date(employee.joiningDate)) /
                  (1000 * 60 * 60 * 24)
              ); // Approximate days
              let totalMonths = 0;

              if (employee.hikes) {
                let prevHikeDate = new Date(employee.joiningDate);

                for (const hike of employee.hikes) {
                  totalMonths +=
                    (new Date(hike.date) - prevHikeDate) /
                    (1000 * 60 * 60 * 24 * 30.417);
                  prevHikeDate = new Date(hike.date);
                }
                totalMonths +=
                  (currentDate - prevHikeDate) / (1000 * 60 * 60 * 24 * 30.417);
              } else {
                totalMonths =
                  (currentDate - new Date(employee.joiningDate)) /
                  (1000 * 60 * 60 * 24 * 30.417);
              }
              // Calculate hikes for each hike salary with the previous salary
              const calculateHikes = (hikes) => {
                let hikesWithPrevSalary = [];
                let prevSalary = employee.salary;
              
                if (hikes && hikes.length > 0) {
                  for (const hike of hikes) {
                    const hikeSalary = hike.newSalary - prevSalary;
                    const hikePercentage = ((hikeSalary / prevSalary) * 100).toFixed(2);
                    hikesWithPrevSalary.push({ hikeSalary, hikePercentage });
                    prevSalary = hike.newSalary;
                  }
                }
              
                return hikesWithPrevSalary;
              };
              return (
                <tr key={employee.id}>
                  <td className="pl-2 pb-2 border border-slate-300">
                    {employee.name}
                  </td>
                  <td className="pl-2 pb-2 border border-slate-300">
                    Rs.
                    <b className="font-semibold">
                      {employee.salary
                        .toString()
                        .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
                    </b>
                  </td>
                  <td className="pl-2 pb-2 border border-slate-300">
                    {employee.hikes && employee.hikes.length > 0 ? (
                      <>
                        Rs.
                        <b className="font-semibold">
                          {employee.hikes[employee.hikes.length - 1].newSalary
                            .toString()
                            .replace(
                              /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                              ","
                            )}
                        </b>
                      </>
                    ) : (
                      <>
                        Rs.
                        <b className="font-semibold">
                          {employee.salary
                            .toString()
                            .replace(
                              /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                              ","
                            )}
                        </b>
                      </>
                    )}
                  </td>

                  <td className="pl-2 pb-2 border border-slate-300">
                    {new Date(employee.joiningDate).toDateString()}
                  </td>
                  <td className="pl-2 pb-2 border border-slate-300">
                    {employee.hikes ? (
                      <ul>
                      {calculateHikes(employee.hikes).map((hikeData, index) => (
                        <li key={index}>
                          Rs.
                          <b className="font-semibold">
                            {hikeData.hikeSalary
                              .toString()
                              .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
                          </b>
                          (<b className="font-semibold">{hikeData.hikePercentage}%</b>)
                        </li>
                      ))}
                    </ul>
                    ) : (
                      "No hikes"
                    )}
                  </td>
                  <td className="pl-2 pb-2 border border-slate-300">
                    {employee.hikes ? (
                      <ul>
                        {employee.hikes.map((hike, index) => (
                          <li key={index}>
                            {new Date(hike.date).toDateString()}: Rs.
                            <b className="font-semibold">
                              {hike.newSalary
                                .toString()
                                .replace(
                                  /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                                  ","
                                )}
                            </b>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No hikes"
                    )}
                  </td>
                  <td className="pl-2 pb-2 border border-slate-300">
                    {employmentDuration}
                  </td>
                  <td className="pl-2 pb-2 border border-slate-300">
                    {Math.floor(totalMonths)}
                  </td>
                  <td className="pl-2 pb-2 border border-slate-300">
                    {employee.hikes ? (
                      <ul>
                        {employee.hikes.map((hike, index) => {
                          const hikeStartDate =
                            index === 0
                              ? employee.joiningDate
                              : employee.hikes[index - 1].date;
                          const hikeEndDate = hike.date;
                          const hikeSalary =
                            ((new Date(hikeEndDate) - new Date(hikeStartDate)) /
                              (1000 * 60 * 60 * 24 * 30.417)) *
                            (index === 0
                              ? employee.salary
                              : employee.hikes[index - 1].newSalary);
                          const hikeStartDateStr = `${new Date(
                            hikeStartDate
                          ).getFullYear()}-${(
                            new Date(hikeStartDate).getMonth() + 1
                          )
                            .toString()
                            .padStart(2, "0")}-${new Date(hikeStartDate)
                            .getDate()
                            .toString()
                            .padStart(2, "0")}`;
                          const hikeEndDateStr = `${new Date(
                            hikeEndDate
                          ).getFullYear()}-${(
                            new Date(hikeEndDate).getMonth() + 1
                          )
                            .toString()
                            .padStart(2, "0")}-${new Date(hikeEndDate)
                            .getDate()
                            .toString()
                            .padStart(2, "0")}`;
                          return (
                            <li key={index}>
                              {hikeStartDateStr}{" "}
                              <b className="font-semibold">to</b>{" "}
                              {hikeEndDateStr}: Rs.
                              <b className="font-semibold">
                                {hikeSalary
                                  .toFixed(2)
                                  .toString()
                                  .replace(
                                    /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                                    ","
                                  )}
                              </b>
                            </li>
                          );
                        })}
                        {/* Add last hike to current date */}
                        <li>
                          {employee.hikes.length > 0 && (
                            <>
                              {new Date(
                                employee.hikes[employee.hikes.length - 1].date
                              ).getFullYear()}
                              -
                              {(
                                new Date(
                                  employee.hikes[employee.hikes.length - 1].date
                                ).getMonth() + 1
                              )
                                .toString()
                                .padStart(2, "0")}
                              -
                              {new Date(
                                employee.hikes[employee.hikes.length - 1].date
                              )
                                .getDate()
                                .toString()
                                .padStart(2, "0")}{" "}
                              <b className="font-semibold">to</b>{" "}
                              {new Date().getFullYear()}-
                              {(new Date().getMonth() + 1)
                                .toString()
                                .padStart(2, "0")}
                              -
                              {new Date().getDate().toString().padStart(2, "0")}
                              : Rs.
                              <b className="font-semibold">
                                {(
                                  ((new Date() -
                                    new Date(
                                      employee.hikes[
                                        employee.hikes.length - 1
                                      ].date
                                    )) /
                                    (1000 * 60 * 60 * 24 * 30.417)) *
                                  new Date(
                                    employee.hikes[
                                      employee.hikes.length - 1
                                    ].newSalary
                                  )
                                )
                                  .toFixed(2)
                                  .toString()
                                  .replace(
                                    /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                                    ","
                                  )}
                              </b>
                            </>
                          )}
                        </li>
                      </ul>
                    ) : (
                      "No hikes"
                    )}
                  </td>
                  <td className="pl-2 pb-2 border border-slate-300">
                    Rs.
                    <b className="font-semibold">
                      {calculateTotalSalary(employee)
                        .toString()
                        .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
                    </b>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

export default EmployeeSalaryCalculator;
