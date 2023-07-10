import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Captcha from "../components/Captcha";

const Login = () => {
	return (
		<>
			<h1 className="text-3xl font-bold text-center text-white mb-2 mt-5">
				Login
			</h1>
			<div className="border-2 w-10 border-white inline-block mb-2"></div>
			<p className="text-white text-lg font-bold mb-10">
				Inicie sesion para ingresar a la plataforma
			</p>
			<div>
				<form action="" className="flex flex-col items-center">
					<div className="bg-gray-100 w-[90%] p-2 flex items-center mb-5 rounded-xl">
						<FaRegEnvelope className="text-gray-400 m-2" />
						<input
							type="email"
							placeholder="your email"
							id="email"
							className="bg-gray-100 outline-none text-sm flex-1"
							name="email"
						/>
					</div>

					<div className="bg-gray-100 w-[90%] p-2 flex items-center mb-5 rounded-xl">
						<MdLockOutline className="text-gray-400 m-2" />
						<input
							type="password"
							placeholder="your password"
							id="password"
							className="bg-gray-100 outline-none text-sm flex-1"
							name="password"
						/>
					</div>

					<Captcha />

					<nav className="text-white my-5 float-left">
						Aun no tienes una cuenta?{" "}
						<Link to="/auth/register" className="border-b-white border-b-2">
							<span className="font-bold">Crear cuenta</span>
						</Link>
					</nav>

					<input
						type="submit"
						value="Iniciar sesion"
						className="text-white hover:text-[#960A25] border-2 border-white [#960A25] hover:bg-white rounded-3xl py-2.5 px-5 my-4 cursor-pointer"
					/>
				</form>
			</div>
		</>
	);
};

export default Login;
