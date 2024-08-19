import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import waveimage from "../assets/wave.png";
import ExpenseBarChart from "./Charts/ExpenseBarChart";
import ProjectCurveChart from "./Charts/ProjectCurveChart";

export default function Welcome() {
  const { user } = useAuthContext();
  return (
    <div className="h-screen">
      <div className="section-01 grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-5 mt-4">
        <div className="flex flex-col justify-between p-4 h-40 rounded-lg backdrop-blur-xl bg-theme-1/75 ">
          <p className="text-white text-2xl">Projects</p>
          <div className="flex justify-between items-center">
          <p className="text-white text-2xl">125</p><p className="text-white text-sm font-semibold">45%</p>
          </div>
        </div>
        <div className="flex flex-col justify-between p-4 h-40 rounded-lg backdrop-blur-xl bg-theme-2/75  ">
        <p className="text-white text-2xl">New Employees</p>
        <div className="flex justify-between items-center">
          <p className="text-white text-2xl">175</p><p className="text-white text-sm font-semibold">65%</p>
          </div>
        </div>
        <div className="flex flex-col justify-between p-4 h-40 rounded-lg backdrop-blur-xl bg-theme-1/75 ">
        <p className="text-white text-2xl">Running Tasks</p>
        <div className="flex justify-between items-center">
          <p className="text-white text-2xl">225</p><p className="text-white text-sm font-semibold">45%</p>
          </div>
        </div>
        <div className="flex flex-col justify-between p-4 h-40 rounded-lg backdrop-blur-xl bg-theme-2/75 ">
        <p className="text-white text-2xl">Earning</p>
        <div className="flex justify-between items-center">
          <p className="text-white text-2xl">325</p><p className="text-white text-sm font-semibold">65%</p>
          </div>
        </div>
      </div>
      <div className="section-01 grid grid-cols-2 gap-5 mt-10">
        <div className="h-auto flex justify-center py-5 rounded-lg backdrop-blur-xl bg-white shadow-xl">
        <ExpenseBarChart/>
        </div>
        <div className="h-auto flex justify-center py-5 rounded-lg backdrop-blur-xl bg-white shadow-xl">
        <ProjectCurveChart/>
        </div>
      </div>
    </div>
  );
}
