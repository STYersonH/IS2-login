import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Captcha from "../components/Captcha";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import usuarios from "../data/usuarios";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/stateProvider";

const Login = () => {
	// usar useHistory para redireccionar
	const navigate = useNavigate();

	// para registrar al usuario logeado
	const [{ userActual, users }, reducer] = useStateValue();

	const [errores, setErrores] = useState({}); // usar variables globales para los errores
	const [loginAttempts, setLoginAttempts] = useState(0); // intentos de login
	const [blockedUntil, setBlockedUntil] = useState(null); // bloqueado hasta
	const [isBlocked, setIsBlocked] = useState(false); // bloqueado

	const [valorCaptcha, setValorCaptcha] = useState("");
	const [captchaError, setCaptchaError] = useState(false);

	// usando useForm para trabajar con formularios
	const {
		register,
		formState: { errors },
		watch,
		handleSubmit,
	} = useForm({
		defaultValues: {},
	});

	const email = watch("email");
	const password = watch("password");

	// cuando se falla al introducir el email o el password
	const procesarIntentoFallido = async () => {
		// incrementar la cantidad de errores que tuvo
		const newLoginAttempts = loginAttempts + 1;
		await setLoginAttempts(newLoginAttempts);
		localStorage.setItem("loginAttempts", newLoginAttempts.toString());

		if (newLoginAttempts >= 3) {
			// Bloquear el login
			setIsBlocked(true);

			const now = new Date();
			// Bloquear por 24 horas
			const blockedUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000);
			setBlockedUntil(blockedUntil);
			localStorage.setItem("blockedUntil", blockedUntil.toString());
			// Display error message
			setErrores({
				...errores,
				general: `Has excedido el número máximo de intentos de inicio de sesión. Inténtalo de nuevo después de ${blockedUntil.toLocaleString()}.`,
			});
		}
	};

	// cuando se pulse el boton de login
	const onSubmit = async (data) => {
		// validar el captcha
		if (valorCaptcha !== true) {
			setCaptchaError(true);
			return;
		} else {
			setCaptchaError(false);
		}

		// revisar si existen los valores de email y password en la BD (script usuarios.js)
		const usuario = usuarios.find((usuario) => usuario.email === email);

		//si el email no existe, actualizar errores para email
		if (!usuario) {
			await setErrores({
				...errores,
				email: "El email no existe",
			});
			procesarIntentoFallido();
			return;
		}

		//si el password no coincide, actualizar errores para password
		if (usuario.password !== password) {
			await setErrores({
				...errores,
				password: "El password no coincide",
			});
			procesarIntentoFallido();
			return;
		}

		// si todo esta bien, actualizar al userActual
		// obtener informacion del userActual de users
		const userEncontrado = users.find((user) => user.email === email);
		// actualizar al userActual
		await reducer({
			type: "SET_USER_ACTUAL",
			userActual: userEncontrado,
		});
		// guardar en localStorage
		await localStorage.setItem("userActual", JSON.stringify(userEncontrado));

		// redireccionar a la pagina de inicio
		navigate("/");
	};

	// cada vez que se renderiza el componente
	useEffect(() => {
		// Obtener el numero de intentos de login desde localStorage
		const storedLoginAttempts = localStorage.getItem("loginAttempts");
		if (storedLoginAttempts) {
			setLoginAttempts(parseInt(storedLoginAttempts));
		}
		// Obtener el tiempo de bloqueo desde localStorage
		const storedBlockedUntil = localStorage.getItem("blockedUntil");
		if (storedBlockedUntil) {
			setBlockedUntil(new Date(storedBlockedUntil));
		}
		// Si el numero de intentos de login es mayor o igual a 3, bloquear el login
		if (storedLoginAttempts >= 3) {
			// Bloquear el login
			setIsBlocked(true);
		}
	}, []);

	//  Remove login attempts and blocked until time when blocked time has passed
	useEffect(() => {
		// Remove login attempts and blocked until time when blocked time has passed
		if (blockedUntil && new Date() >= blockedUntil) {
			setLoginAttempts(0);
			setBlockedUntil(null);
			// desbloquear el login
			setIsBlocked(false);
			localStorage.removeItem("loginAttempts");
			localStorage.removeItem("blockedUntil");
		}
	}, [blockedUntil]);

	// permitir que los mensajes de error aparezcan un ratito
	useEffect(() => {
		// Remove error message after 3 seconds
		const timer = setTimeout(() => {
			setErrores({});
		}, 5000);

		// Clear timer if component unmounts
		return () => clearTimeout(timer);
	}, [errores]);

	return (
		<>
			{isBlocked && (
				<p className="bg-white text-[#960A26] font-bold rounded-xl py-2">
					El usuario ya no tiene intentos, intentar despues de 24 horas
				</p>
			)}
			<h1 className="text-white font-bold">{valorCaptcha}</h1>
			<h1 className="text-3xl font-bold text-center text-white mb-2 mt-5">
				Login
			</h1>
			<div className="border-2 w-10 border-white inline-block mb-2"></div>
			<p className="text-white text-lg font-bold mb-10">
				Inicie sesion para ingresar a la plataforma
			</p>
			<div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col items-center"
				>
					{/* mostrar errores */}
					{errors.email?.type === "required" && (
						<p className="error">El campo email es requerido</p>
					)}
					{errors.email?.type === "pattern" && (
						<p className="error">Se debe asignar un email valido</p>
					)}
					{errores.email && <p className="error">{errores.email}</p>}

					{/* Mostrar campo de email */}
					<div
						className={`bg-gray-100 w-[90%] p-2 flex items-center mb-5 rounded-xl ${
							isBlocked && "bg-gray-400"
						}`}
					>
						<FaRegEnvelope className="text-gray-500 m-2 mr-3" />
						<input
							type="text"
							{...register("email", {
								required: true,
								pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
							})}
							placeholder="your email"
							id="email"
							className={`bg-gray-100 outline-none text-sm flex-1 placeholder:text-gray-500 ${
								isBlocked && "cursor-not-allowed bg-gray-400"
							}`}
							name="email"
							disabled={isBlocked}
						/>
					</div>

					{/* mostrar errores de password */}
					{errors.password?.type === "minLength" && (
						<p className="error">Password debe tener al menos 8 letras</p>
					)}
					{errors.password?.type === "required" && (
						<p className="error">El campo password es requerido</p>
					)}
					{errores.password && <p className="error">{errores.password}</p>}

					{/* Mostrar campo de password */}
					<div
						className={`bg-gray-100 w-[90%] p-2 flex items-center mb-5 rounded-xl ${
							isBlocked && "bg-gray-400"
						}`}
					>
						<MdLockOutline className="text-gray-500 m-2 mr-3" />
						<input
							type="password"
							{...register("password", {
								required: true,
								minLength: 8,
							})}
							placeholder="your password"
							id="password"
							className={`bg-gray-100 outline-none text-sm flex-1 placeholder:text-gray-500 ${
								isBlocked && "cursor-not-allowed bg-gray-400"
							}`}
							name="password"
							disabled={isBlocked}
						/>
					</div>

					{/* Mostrar campo de captcha */}
					<Captcha
						ObtenerResultadoCaptcha={setValorCaptcha}
						color={captchaError ? "secondary" : "primary"}
						disabled={isBlocked}
					/>
					{captchaError && <p className="error-captcha">Valor invalido</p>}

					{/* Mostrar link de registro */}
					<nav className="text-white my-5 float-left">
						Aun no tienes una cuenta?{" "}
						<Link to="/auth/register" className="border-b-white border-b-2">
							<span className="font-bold">Crear cuenta</span>
						</Link>
					</nav>

					{/* Mostrar boton de login */}
					<input
						type="submit"
						value="Iniciar sesion"
						className={`text-white hover:text-[#960A25] border-2 border-white hover:bg-white rounded-3xl py-2.5 px-5 my-4 cursor-pointer ${
							isBlocked && "hover:text-white hover:bg-[#960A26] cursor-auto"
						}`}
						disabled={isBlocked}
					/>
				</form>
			</div>
		</>
	);
};

export default Login;
