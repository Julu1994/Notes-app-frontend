import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icons from "../../../components/common/Icons/Icons";
import styles from "../styles/LoginForm.module.scss";
import Button from "../../../components/common/Button/Button";

const LoginForm = ({
    password,
    email,
    onSubmitHandler,
    error,
    onChangeHandler,
}) => {
    const [showPasswod, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const toggleViewPassword = () => {
        setShowPassword(!showPasswod);
    };
    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <div>
                <TextField
                    fullWidth
                    size={"small"}
                    name={"email"}
                    type={"text"}
                    label={"Email"}
                    value={email}
                    onChange={onChangeHandler}
                    required={true}
                    error={error ? true : false}
                    helperText={error?.errorMessage ? error.errorMessage : ""}
                />
            </div>
            <div className={styles.form_input_field}>
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
                    onChange={onChangeHandler}
                    type={showPasswod ? "text" : "password"}
                    label={"Password"}
                    value={password}
                    required={true}
                    error={error ? true : false}
                    helperText={error?.errorMessage ? error.errorMessage : ""}
                />
            </div>
            <div className={styles.form_buttons}>
                <Button type={"submit"}>Login</Button>
                <Button
                    variant={"btn-border"}
                    onClick={() => {
                        navigate("/auth/signup");
                    }}>
                    Signup
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
