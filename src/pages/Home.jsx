import React, { useEffect } from "react";
import { useStateValue } from "../context/stateProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	// obtener userActual del localStorage
	const userActual = JSON.parse(localStorage.getItem("userActual"));

	useEffect(() => {
		if (!userActual) {
			navigate("/auth/login");
		}
	}, [userActual]);

	return (
		<div className="h-screen flex justify-center items-center">
			Home para {userActual.nombre}
		</div>
	);
};

export default Home;
