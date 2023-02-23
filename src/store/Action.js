export const logout = (_payload) => ({
    type: "LOGOUT",
    payload: null,
});

export const getAuthToken = (payload) => ({
    type: "AUTH_TOKEN",
    payload,
});

export const updateUI = (payload) => ({
    type: "UPDATE_UI",
    payload,
});
