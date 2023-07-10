import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<main className="flex flex-col justify-center items-center min-h-screen">
			<div className="flex flex-col items-center justify-center w-full flex-1 px-0 md:px-20 text-center">
				<div className="bg-white rounded-2xl md:shadow-2xl flex flex-col md:flex-row w-[90%] md:w-5/6 max-w-4xl">
					{/* Logo part */}
					<div className="md:w-2/5 flex items-center justify-center items-center mb-10">
						<img src="/img/unsaac.png" alt="logo" className="h-[260px] " />
					</div>
					{/* form part */}
					<div className="md:w-3/5 p-4 bg-[#960A25] md:rounded-tr-2xl md:rounded-br-2xl">
						<Outlet />
					</div>
				</div>
			</div>
		</main>
	);
};

export default AuthLayout;
