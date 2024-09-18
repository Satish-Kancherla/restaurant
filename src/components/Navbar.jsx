import React from "react";
import acqlogo from "../assets/logo.svg";
import { Bell, ChevronRight, LogOut, MenuIcon, Search, UserCog2, UserRound } from "lucide-react";
import { Menu, MenuItem } from "@mui/material";
import { useAuthContext } from "../contexts/AuthContext";
import { useGlobalContext } from "../contexts/GlobalContext";
import Button from "./ui/Button";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import useLoacationArray from "../hooks/useLoacationArray";

export default function Navbar({ className }) {
    const { dispatch, user } = useAuthContext();
    const { sidebar, setSidebar, tabs, setIsSearch } = useGlobalContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const locArray = useLoacationArray();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div
            className={cn(
                "fixed left-15rem lg:left-0 h-20 flex justify-between w-[calc(100%-15rem)] lg:w-full  items-center z-10  bg-white bg-opacity-90 backdrop-blur-sm font-medium py-4  border-b",
                className
            )}
        >
            <div className="flex items-center  mx-2 lg:ml-1 logo select-none box-border">
                <MenuIcon
                    className="hidden lg:grid min-w-6 mx-4 cursor-pointer"
                    onClick={() => {
                        setSidebar(!sidebar);
                    }}
                />
                <div className="text-theme-1 text-xl capitalize flex items-center pl-2">
                    {locArray[0]}&nbsp;
                    <ChevronRight /> &nbsp;{locArray[1]?.replace(/-/g, " ")}
                </div>
            </div>
            <div className="flex items-center gap-4 text-2xl text-zinc-700 box-border mr-2">
                
                <div
                    onClick={handleClick}
                    className="cursor-pointer uppercase h-9 w-9 m-1 text-lg bg-theme-1 select-none flex items-center justify-center rounded-full text-white "
                >
                    {user &&
                        user?.name?.split(" ").map((str, i) => {
                            if (i < 2) return str[0];
                        })}
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <div className="flex w-full items-center px-4 ">
                        <div className="uppercase h-6 w-6 text-xs bg-theme-1 select-none flex items-center justify-center rounded-full text-white">
                            {user &&
                                user?.name?.split(" ").map((str, i) => {
                                    if (i < 2) return str[0];
                                })}
                        </div>
                        {user && <div className="mx-2 max-w-24 truncate capitalize text-theme-1 font-semibold text-lg">{user.name}</div>}
                    </div>

                    <hr className="my-2" />
                   
                    <MenuItem
                        onClick={() => {
                            dispatch({ type: "LOGOUT" });
                        }}
                    >
                        <LogOut className="text-theme-text w-5 mr-2 cursor-pointer" />
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}
