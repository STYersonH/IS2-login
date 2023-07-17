import usuarios from "../data/usuarios";
import { fetchUser } from "../utils/fetchLocalStorage";

const userInfo = fetchUser();

export const initialState = {
	userActual: userInfo,
	users: usuarios,
};
