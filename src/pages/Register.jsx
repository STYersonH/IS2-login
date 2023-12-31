import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/stateProvider";

const Register = () => {
	const navigate = useNavigate();

	// usar variables globales para los errores
	const [errores, setErrores] = useState({});

	// para registrar al usuario logeado
	const [{ users }, reducer] = useStateValue();

	// usando useForm para trabajar con formularios
	const {
		register,
		formState: { errors },
		watch,
		handleSubmit,
	} = useForm({
		defaultValues: {},
	});

	const nombre = watch("nombre");
	const email = watch("email");
	const password = watch("password");
	const password_confirm = watch("password_confirm");

	const confirmationPassword = () => {
		return password === password_confirm;
	};

	const onSubmit = async (data) => {
		//revisar que las contrasenias coincidan
		if (!confirmationPassword()) {
			setErrores({
				...errores,
				password_confirm: "Las contraseñas no coinciden",
			});
			return;
		}

		// si todo va bien, se crea el usuario
		const dataNewUser = {
			id: users.length + 1,
			nombre: data.nombre,
			email: data.email,
			password: data.password,
		};

		console.log("nuevo users: ", [...users, dataNewUser]);

		// se agrega el usuario a la lista de usuarios
		reducer({
			type: "SET_USERS",
			users: [...users, dataNewUser],
		});

		// se guarda el usuario en el local storage
		localStorage.setItem("userActual", JSON.stringify(dataNewUser));

		// redirigir al home page
		navigate("/");
	};

	return (
		<>
			<h1 className="text-3xl font-bold text-center text-white mb-2 mt-5">
				Crear cuenta
			</h1>
			<div className="border-2 w-10 border-white inline-block mb-2"></div>
			<p className="text-white text-lg font-bold mb-10">
				para acceder a la plataforma
			</p>
			<div>
				<form
					action=""
					className="flex flex-col items-center justify-center"
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* mostrar errores para nombre */}
					{errors.nombre?.type === "required" && (
						<p className="error">El campo nombre es requerido</p>
					)}
					<div className="bg-gray-100 w-[90%] p-2 flex items-center mb-5 rounded-xl">
						<AiOutlineUser className="text-gray-400 my-2 mx-3" />
						<input
							type="text"
							{...register("nombre", {
								required: true,
							})}
							placeholder="tu nombre"
							id="nombre"
							className="bg-gray-100 outline-none text-sm flex-1"
							name="nombre"
						/>
					</div>

					{/* mostrar errores para email*/}
					{errors.email?.type === "required" && (
						<p className="error">El campo email es requerido</p>
					)}
					{errors.email?.type === "pattern" && (
						<p className="error">Se debe asignar un email valido</p>
					)}
					<div className="bg-gray-100 w-[90%] p-2 flex items-center mb-5 rounded-xl">
						<FaRegEnvelope className="text-gray-400 my-2 mx-3" />
						<input
							type="email"
							{...register("email", {
								required: true,
								pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
							})}
							placeholder="tu email"
							id="email"
							className="bg-gray-100 outline-none text-sm flex-1"
							name="email"
						/>
					</div>

					{/* mostrar errores para password */}
					{errors.password?.type === "minLength" && (
						<p className="error">Password debe tener al menos 8 letras</p>
					)}
					{errors.password?.type === "required" && (
						<p className="error">El campo password es requerido</p>
					)}
					<div className="bg-gray-100 w-[90%] p-2 flex items-center mb-5 rounded-xl">
						<MdLockOutline className="text-gray-400 my-2 mx-3" />
						<input
							type="password"
							{...register("password", {
								required: true,
								minLength: 8,
							})}
							placeholder="tu password"
							id="password"
							className="bg-gray-100 outline-none text-sm flex-1"
							name="password"
						/>
					</div>

					{/* mostrar errores para password confirmation */}
					{errors.password_confirm?.type === "required" && (
						<p className="error">El campo confirmar password es requerido</p>
					)}
					{errores.password_confirm && (
						<p className="error">El password ingresado no coincide </p>
					)}
					<div className="bg-gray-100 w-[90%] p-2 flex items-center mb-5 rounded-xl">
						<MdLockOutline className="text-gray-400 my-2 mx-3" />
						<input
							type="password"
							{...register("password_confirm", {
								required: true,
								minLength: 8,
							})}
							placeholder="tu password una vez mas"
							id="password_confirm"
							className="bg-gray-100 outline-none text-sm flex-1"
							name="password_confirm"
						/>
					</div>
					<nav className="text-white mb-5 float-left">
						Ya tienes una cuenta?{" "}
						<Link to="/auth/login" className="border-b-white border-b-2">
							<span className="font-bold">Login</span>
						</Link>
					</nav>

					<input
						type="submit"
						value="crear cuenta"
						className="text-white hover:text-[#960A25] border-2 border-white [#960A25] hover:bg-white rounded-3xl py-2.5 px-5 my-4 cursor-pointer"
					/>
				</form>
			</div>
		</>
	);
};

export default Register;
