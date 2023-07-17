export const actionType = {
	SET_ACTUAL_USER: "SET_ACTUAL_USER",
	SET_USERS: "SET_USERS",
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_ACTUAL_USER: {
			return {
				...state,
				userActual: action.userActual,
			};
		}
		case actionType.SET_USERS: {
			return {
				...state,
				users: action.users,
			};
		}
	}
};

export default reducer;
