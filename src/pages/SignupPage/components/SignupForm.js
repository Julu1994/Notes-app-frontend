import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "../../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import Icons from "../../../components/common/Icons/Icons";
import styles from "../styles/SignupForm.module.scss";
const SignupForm = ({
    onChangeHandler,
    firstName,
    lastName,
    error,
    password,
    email,
    loading,
    confirmPassword,
    submitHandler,
}) => {
    const [showPasswod, setShowPassword] = useState(false);
    const [showConfirmPasswod, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const toggleViewPassword = () => {
        setShowPassword(!showPasswod);
    };
    const toggleViewConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPasswod);
    };
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div>
                <TextField
                    fullWidth
                    size={"small"}
                    name={"firstName"}
                    type={"text"}
                    label={"First Name"}
                    value={firstName}
                    onChange={onChangeHandler}
                    required={true}
                    helperText={
                        error?.name === "firstName" ? error?.errorMessage : ""
                    }
                    error={error?.name === "firstName" || error ? true : false}
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    size={"small"}
                    name={"lastName"}
                    type={"text"}
                    label={"Last Name"}
                    value={lastName}
                    onChange={onChangeHandler}
                    required={true}
                    error={error?.name === "lastName" || error ? true : false}
                    helperText={
                        error?.name === "lastName" ? error?.errorMessage : ""
                    }
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    size={"small"}
                    name={"email"}
                    type={"email"}
                    label={"Email"}
                    value={email}
                    onChange={onChangeHandler}
                    required={true}
                    error={error?.name === "email" || error ? true : false}
                    helperText={
                        error?.name === "email" ? error?.errorMessage : ""
                    }
                />
            </div>
            <div className={styles.password_input_field}>
                <div className={styles.view_btn}>
                    <button type="button" onClick={toggleViewPassword}>
                        <Icons
                            name={showPasswod ? "viewOff" : "viewOn"}
                            color={"#9fa7b6"}
                            size={"1.3rem"}
                        />
                    </button>
                </div>
                <TextField
                    fullWidth
                    size={"small"}
                    name={"password"}
                    type={showPasswod ? "text" : "password"}
                    label={"Password"}
                    value={password}
                    onChange={onChangeHandler}
                    required={true}
                    error={error?.name === "password" || error ? true : false}
                    helperText={
                        error?.name === "password" || error
                            ? error?.errorMessage
                            : ""
                    }
                />
            </div>
            <div className={styles.confirm_password_input_field}>
                <div className={styles.view_btn}>
                    <button type="button" onClick={toggleViewConfirmPassword}>
                        <Icons
                            name={showConfirmPasswod ? "viewOff" : "viewOn"}
                            color={"#9fa7b6"}
                            size={"1.3rem"}
                        />
                    </button>
                </div>
                <TextField
                    fullWidth
                    size={"small"}
                    name={"confirmPassword"}
                    type={showConfirmPasswod ? "text" : "password"}
                    label={"Confirm Password"}
                    value={confirmPassword}
                    onChange={onChangeHandler}
                    required={true}
                    error={
                        error?.name === "confirmPassword" || error
                            ? true
                            : false
                    }
                    helperText={
                        error?.name === "confirmPassword" || error
                            ? error?.errorMessage
                            : ""
                    }
                />
            </div>
            <div className={styles.form_buttons}>
                <Button type={"submit"}>Create Your Account</Button>
                <Button
                    variant={"btn-border"}
                    onClick={() => {
                        navigate("/");
                    }}>
                    Login to Your Account
                </Button>
            </div>
        </form>
    );
};

export default SignupForm;
