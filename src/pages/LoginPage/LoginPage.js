import React, { useState, useContext } from "react";
import AuthPageLayout from "../../layouts/AuthPageLayout";
import LoginForm from "./component/LoginForm";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../store/Action";
import { Context } from "../../store/Context";
import { toast } from "react-hot-toast";
import { useHttpHook } from "../../hooks/useHttpHook";

const defaultLoginValue = {
    email: "",
    password: "",
};

const LoginPage = () => {
    const [loginValue, setLoginValue] = useState(defaultLoginValue);
    const { email, password } = loginValue;
    const { dispatch } = useContext(Context);
    const navigate = useNavigate();

    // Get response data from server
    const getResponseData = (data) => {
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

    const { sendRequest, loading, error, setError } = useHttpHook();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setLoginValue({ ...loginValue, [name]: value });
        if (e.target.value !== "") {
            setError(null);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (password.length < 8) {
            return setError({ errorMessage: "Incorrect Email or Password" });
        }

        sendRequest(
            {
                method: "POST",
                url: "/auth/login",
                postData: {
                    email,
                    password,
                },
            },
            getResponseData
        );
    };

    return (
        <AuthPageLayout pageTitle={"Login to your Account"} loading={loading}>
            <LoginForm
                password={password}
                email={email}
                error={error}
                onSubmitHandler={submitHandler}
                onChangeHandler={onChangeHandler}
            />
        </AuthPageLayout>
    );
};

export default LoginPage;
