import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import heroimage from "../assets/hero.png";
import { instance } from "../components/Url";
import { IndianRupee } from 'lucide-react';


export default function Welcome() {
  const { user } = useAuthContext();

  const [data,setData] = useState();
  const [items,setItems] = useState();

  const fetchData = async() => {
    try{
      const response = await instance.get("/api/v1/menu");
      setData(response.data)
      console.log(response.data)
      console.log(data)
    }catch(error){
      console.log("fetching error",error)
    }
  }
  
  const fetchItems = async() => {
    try{
      const response = await instance.get("/api/v1/inventory");
      setItems(response.data)
    }catch(error){
      console.log("fetching error",error)
    }
  }

  useEffect(()=>{
    fetchData()
    fetchItems()
  },[])

  return (
    <div className="h-auto">
        <div className="hero flex justify-between w-full h-64 rounded-lg overflow-hidden bg-white relative shadow-lg">
            <div className="self-center m-4 ml-12 z-10">
                <div className="text-3xl font-semibold text-theme-text truncate capitalize"><span title="Hello, How Do you Do? ">Howdy</span>, {user?.name}</div>
                <div className="span truncate">Lets do Something Awesome 🚀</div>
            </div>
            <div className="self-end absolute inset-0 opacity-30">
                <img src={heroimage} className='w-full object-cover' alt="" />
            </div>
        </div> 
        <div className="section-01 grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-5 mt-4">
        <div className="flex flex-col justify-between p-4 h-auto rounded-lg backdrop-blur-xl bg-white shadow-xl ">
          <p className="text-black font-semibold text-2xl mb-5">Menu</p>
          {data?.map((item, index) => (
          <div  key={index} className="flex justify-between items-center text-zinc-600 ">
          <p className="font-medium text-base">{item.itemname}</p><p className="flex items-center text-sm font-medium"><IndianRupee className="w-3.5" />{item.price}</p>
          </div>
          ))}
        </div>
        <div className="flex flex-col justify-between p-4 h-auto rounded-lg backdrop-blur-xl bg-white shadow-xl ">
          <p className="text-black font-semibold text-2xl mb-5">Inventory</p>
          {items?.map((data, index) => (
          <div key={index} className="flex justify-between items-center text-zinc-600 ">
          <p className=" font-medium text-base ">{data.itemname}</p><p className=" text-sm font-semibold">{data.availablestock} kgs</p>
          </div>
          ))}
        </div>

        </div>
    </div>
  );
}
