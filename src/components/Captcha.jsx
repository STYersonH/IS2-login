import {
	Alert,
	CardActions,
	CardContent,
	Divider,
	IconButton,
	TextField,
} from "@mui/material";
import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./captcha.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Captcha({ ObtenerResultadoCaptcha, color = "primary", disabled }) {
	const randomString = Math.random().toString(36).slice(8);
	const [captcha, setCaptcha] = useState(randomString);
	const [text, setText] = useState("");
	const [valid, setValid] = useState(false);

	const refreshString = () => {
		setText("");
		setCaptcha(Math.random().toString(36).slice(8));
	};

	const matchCaptcha = async (event) => {
		event.preventDefault();

		if (event.target.value === captcha) {
			ObtenerResultadoCaptcha(true);
		} else {
			ObtenerResultadoCaptcha(false);
		}
	};

	// creando nuevos colores
	const theme = createTheme({
		palette: {
			primary: {
				main: "#FFF",
			},
			secondary: {
				main: `rgb(202 138 4 / var(--tw-bg-opacity))`,
			},
			disabled: {
				main: "#FFF",
			},
		},
	});

	return (
		<>
			<ThemeProvider theme={theme}>
				<CardContent variant={color}>
					{/*sx={{ backgroundColor: "#000" }} : para dar estilo a CardActions */}
					<CardActions>
						{color === "primary" ? (
							<div className={`h3-primary flex justify-center mr-1`}>
								{captcha}
							</div>
						) : (
							<div className={`h3-secondary flex justify-center mr-1`}>
								{captcha}
							</div>
						)}
						<IconButton onClick={() => refreshString()} color={color}>
							<RefreshIcon color="#960A25" />
						</IconButton>
					</CardActions>

					<form onSubmit={matchCaptcha}>
						<TextField
							color={color}
							label="Enter Captcha"
							focused
							value={text}
							fullWidth
							onChange={(e) => {
								setText(e.target.value);
								matchCaptcha(e);
							}}
							error={valid}
							helperText={valid && "Invalid Captcha"}
							inputProps={{
								style: { color: "white" },
							}}
						/>
					</form>
				</CardContent>
			</ThemeProvider>
		</>
	);
}

export default Captcha;
