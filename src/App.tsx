import { FC, StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./components/global/appRoutes";
import "./assets/fonts/fonts.css";
import classes from "./App.module.css";

const App: FC = () => {
	return (
		<StrictMode>
			<div className={classes.app}>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</div>
		</StrictMode>
	);
};

export default App;
