export const reducer = (state, action) => {
    switch (action.type) {
        case "AUTH_TOKEN":
            return {
                ...state,
                userPayload: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                userPayload: action.payload || null,
            };
        case "UPDATE_UI":
            return {
                ...state,
                reRenderUi: action.payload,
            };
        default:
            return state;
    }
};
