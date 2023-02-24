import React, { useState, useContext } from "react";
import AuthPageLayout from "../../layouts/AuthPageLayout";
import SignupForm from "./components/SignupForm";
import { useHttpHook } from "../../hooks/useHttpHook";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../store/Action";
import { Context } from "../../store/Context";

const defaultSignupValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignupPage = () => {
    const [inputData, setInputData] = useState(defaultSignupValue);
    const { dispatch } = useContext(Context);
    const { firstName, lastName, email, password, confirmPassword } = inputData;
    const navigate = useNavigate();
    const { sendRequest, loading, error, setError } = useHttpHook();

    // Get response data from server
    const getResponseData = (data) => {
        console.log(data, "DATA");
        dispatch(
            getAuthToken({
                userData: data?.userPayload,
                authToken: data?.token,
            })
        );
        if (data.token) {
            navigate("/home");
            toast.success(`Welcome Back! Mr.${data?.userPayload?.name}`);
        }
    };

    // Input change handler
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
        if (e.target.value !== "") {
            setError(null);
        }
    };

    // Submit form handler
    const submitHandler = (e) => {
        e.preventDefault();
        if (password && confirmPassword) {
            if (password.length < 8) {
                return setError({
                    name: "password",
                    errorMessage:
                        "Password should not be less than 8 characters!",
                });
            }
            if (password !== confirmPassword) {
                return setError({
                    name: "confirmPassword",
                    errorMessage: "Passwords did not match!",
                });
            }
        }

        // Send request to server
        sendRequest(
            {
                method: "POST",
                url: "http://63.35.212.223:8181/api/v1",
                postData: {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                },
            },
            getResponseData
        );
    };

    return (
        <AuthPageLayout pageTitle={"Create Your Account"} loading={loading}>
            <SignupForm
                onChangeHandler={onChangeHandler}
                firstName={firstName}
                lastName={lastName}
                error={error}
                password={password}
                email={email}
                loading={loading}
                submitHandler={submitHandler}
                confirmPassword={confirmPassword}
            />
        </AuthPageLayout>
    );
};

export default SignupPage;
