//All the Initial States will be here

export const initialState = {
    userPayload: JSON.parse(localStorage.getItem("token")) || null,
};
