import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import heroimage from "../assets/hero.png";


export default function Welcome() {
  const { user } = useAuthContext();

  return (
    <div className="h-auto">
        <div className="hero flex justify-between w-full h-64 rounded-lg overflow-hidden bg-zinc-100 relative">
            <div className="self-center m-4 ml-12 z-10">
                <div className="text-3xl font-semibold text-orange-600 truncate capitalize"><span title="Hello, How Do you Do? ">Howdy</span>, {user?.name}</div>
                <div className="span truncate">Lets do Something Awesome 🚀</div>
            </div>
            <div className="self-end absolute inset-0 opacity-30">
                <img src={heroimage} className='w-full object-cover' alt="" />
            </div>
        </div> 
    </div>
  );
}
