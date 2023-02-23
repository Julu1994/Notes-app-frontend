import React, { useContext } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Context } from "../../store/Context";
import { logout } from "../../store/Action";

const ProtectedRoutes = ({ children, ...otherProps }) => {
    const { state, dispatch } = useContext(Context);
    const { userPayload } = state;
    const location = useLocation();
    if (!userPayload?.authToken) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    try {
        const decodedToken = jwt_decode(userPayload.authToken);
        // console.log(decodedToken, "DECODE")
        // checking token expiration date
        const expirationDate = new Date(decodedToken.exp * 1000);
        // console.log(expirationDate, "EXPIRE")
        if (expirationDate < new Date()) {
            return <Navigate to="/login" state={{ from: location }} />;
        }
    } catch (err) {
        dispatch(logout());
    }
    return (
        <>
            <Outlet />
            {children}
        </>
    );
};

export default ProtectedRoutes;
