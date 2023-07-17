import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { StateProvider } from "./context/stateProvider.jsx";
import { initialState } from "./context/initialState.jsx";
import reducer from "./context/reducer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<RouterProvider router={router} />
		</StateProvider>
	</React.StrictMode>
);
