import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import * as FormElements from "../../components/ui/FormElements";
import Button from "../../components/ui/Button";
import { useFormValidation } from "../../hooks/useFormValidation";
import { getUrl, instance } from "../../components/Url";

export default function Signin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const { dispatch } = useAuthContext();
    const url = getUrl();
    const initialState = {
        email: "",
        password: "",
    };
    
    const onSubmit = async (values) => {
        setIsLoading(true);
        await axios
            .post("http://localhost:5000/api/v1/users/signin", values)
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data.data.userpayload));
                localStorage.setItem("accessToken", data.data.accessToken);
                dispatch({ type: "LOGIN", payload: data.data });
                setIsLoading(false);
                console.log("123", data);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
                setIsLoading(false);
            });
        return { status: 200 };
    };

    function validate(values) {
        const errors = {};

        if (!values.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "Invalid email address";
        }
        if (!values.password.trim()) {
            errors.password = "Password is required";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(values.password)) {
            errors.password = "Weak Password";
        }
        return errors;
    }

    const { formData, errors, changeHandle, handleSubmit, cleanup } = useFormValidation(initialState, onSubmit, validate);

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className=" my-10 p-8 w-full max-w-md bg-white rounded-lg shadow-xl">
                <div className="title m-2 my-4 text-4xl font-bold text-theme-text">Sign In</div>
                <div className="m-2 font-semibold text-zinc-400">Enter your email and password to sign in!</div>
                <div className="h-px m-2 my-3 bg-zinc-200"></div>
                <FormElements.Input
                    value={formData.email}
                    onChange={changeHandle}
                    error={errors.email}
                    className="m-2 my-4"
                    label="Email"
                    type="email"
                    name="email"
                />
                <FormElements.Input
                    value={formData.password}
                    onChange={changeHandle}
                    error={errors.password}
                    className="m-2 my-4"
                    label="Password"
                    type="password"
                    name="password"
                />
                {error?.response && (
                    <div className="m-2 text-white padding bg-theme-danger bg-opacity-80 p-2 rounded">
                        {error?.response?.data?.message}
                    </div>
                )}
                <Button className="m-2" disabled={isLoading} onClick={handleSubmit}>
                    Sign In
                </Button>
                <div className="not-user text-gray-400 m-2 my-3 text-sm">
                    Not a User? &nbsp;
                    <Link to={"/signup"} className="text-violet-500 underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
