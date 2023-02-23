/********************************************************
@useHttpHook
@Description A custom hook for making HTTP requests using Axios.
@Returns An object with three properties: sendRequest, loading, and hasError.
The sendRequest function takes two arguments: reqConfig and getResponseData.
reqConfig: An object with properties for the HTTP request such as url, method, and data that will post to server,( if it's POST method).
getResponseData: A callback function that handles the response data from the request.
The loading property is a boolean that indicates whether a request is currently in progress.
The hasError property is the error message if a request fails.
@Implementation
const { hasError, sendRequest, loading } = useHttpHook();
const [data, setData] = useState(null);
const handleResponse = (response) => {
setData(response.data);
}
useEffect(() => {
sendRequest({ method: 'GET', url: '/api/data' }, handleResponse);
}, []);
*********************************************************/

import { useCallback, useContext, useState } from "react";
import { axiosInstance } from "../utils/axios.instance";
import { Context } from "../store/Context";
import { logout } from "../store/Action";

export const useHttpHook = () => {
    const { state, dispatch } = useContext(Context);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { userPayload } = state;
    const sendRequest = useCallback(
        async (reqConfig, getResponseData) => {
            setLoading(true);
            try {
                const response = await axiosInstance({
                    method: reqConfig.method ? reqConfig.method : "get",
                    url: reqConfig.url,
                    data: reqConfig.postData ? reqConfig.postData : {},
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userPayload?.authToken}`,
                    },
                });
                getResponseData(response?.data);
                setLoading(false);
            } catch (err) {
                setError(err?.response?.data || err?.message);
                if (
                    err.response.status === 401 ||
                    err.response.status === 403
                ) {
                    dispatch(logout());
                }
                // console.log(err?.response?.data || err?.message, "ERROR FROM USEHTTP HOOK");

                setLoading(false);
            }
        },
        [dispatch, userPayload?.authToken]
    );

    return {
        sendRequest,
        loading,
        error,
        setError,
    };
};
