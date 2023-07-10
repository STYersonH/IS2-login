import { createRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";

const Register = () => {
	const nameRef = createRef();
	const emailRef = createRef();
	const passwordRef = createRef();
	const passwordConfirmationRef = createRef();

	//me quede aqui
	const [errors, setErrors] = useState({});
	//const { register } = useAuth({ middleware: "guest", url: "/" });

	const handleSubmit = async (e) => {
		e.preventDefault();

		const datos = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			password_confirmation: passwordConfirmationRef.current.value,
		};

		//Realizar el proceso de registrar
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
					onSubmit={handleSubmit}
				>
					{Array.isArray(errors)
						? errors?.map((error, id) => (
								<p key={id} className="w-[90%]">
									<Alerta>{error}</Alerta>
								</p>
						  ))
						: null}
					<div className="bg-gray-100 w-[90%] p-2 flex items-center m-5 rounded-xl">
						<AiOutlineUser className="text-gray-400 m-2" />
						<input
							type="text"
							placeholder="your name"
							id="name"
							className="bg-gray-100 outline-none text-sm flex-1"
							name="name"
							ref={nameRef}
						/>
					</div>
					<div className="bg-gray-100 w-[90%] p-2 flex items-center mb-5 rounded-xl">
						<FaRegEnvelope className="text-gray-400 m-2" />
						<input
							type="email"
							placeholder="your email"
							id="email"
							className="bg-gray-100 outline-none text-sm flex-1"
							name="email"
							ref={emailRef}
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
							ref={passwordRef}
						/>
					</div>

					<div className="bg-gray-100 w-[90%] p-2 flex items-center mb-5 rounded-xl">
						<MdLockOutline className="text-gray-400 m-2" />
						<input
							type="password"
							placeholder="your password again"
							id="password_confirm"
							className="bg-gray-100 outline-none text-sm flex-1"
							name="password_confirm"
							ref={passwordConfirmationRef}
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
