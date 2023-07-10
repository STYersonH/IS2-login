import {
	Alert,
	Button,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	IconButton,
	TextField,
} from "@mui/material";
import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./captcha.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Captcha() {
	const randomString = Math.random().toString(36).slice(8);
	const [captcha, setCaptcha] = useState(randomString);
	const [text, setText] = useState("");
	const [valid, setValid] = useState(false);
	const [success, setSuccess] = useState(false);

	const refreshString = () => {
		setText("");
		setCaptcha(Math.random().toString(36).slice(8));
	};

	const matchCaptcha = (event) => {
		event.preventDefault();
		if (text === captcha) {
			setValid(false);
			setSuccess(true);
		} else {
			setValid(true);
			setSuccess(false);
		}
	};

	// creando nuevos colores
	const theme = createTheme({
		palette: {
			primary: {
				main: "#960A25",
			},
			secondary: {
				main: "#FFF",
			},
		},
	});

	return (
		<>
			{success && (
				<Alert variant="outlined" sx={{ marginBottom: "20px" }}>
					Successful
				</Alert>
			)}
			<Divider />

			<CardContent>
				<CardActions>
					<div className="h3 flex justify-center mr-1">{captcha}</div>
					<ThemeProvider theme={theme}>
						<IconButton onClick={() => refreshString()} color="secondary">
							<RefreshIcon color="#960A25" />
						</IconButton>
					</ThemeProvider>
				</CardActions>

				<form onSubmit={matchCaptcha}>
					<ThemeProvider theme={theme}>
						<TextField
							color="secondary"
							label="Enter Captcha"
							focused
							value={text}
							fullWidth
							onChange={(e) => setText(e.target.value)}
							error={valid}
							helperText={valid && "Invalid Captcha"}
							inputProps={{
								style: { color: "white" },
							}}
						/>
					</ThemeProvider>

					{/* <Button
						variant="contained"
						color="success"
						type="submit"
						sx={{ marginTop: "20px" }}
					>
						Submit
					</Button> */}
				</form>
			</CardContent>
		</>
	);
}

export default Captcha;
