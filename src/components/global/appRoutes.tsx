/* eslint-disable import/no-named-default */
import { Route, Routes } from "react-router-dom";

import Error403 from "src/pages/errorPages/error403";
import Error404 from "src/pages/errorPages/error404";
import Error500 from "src/pages/errorPages/error500";
import ErrorsBoundary from "src/errors/errorBoundary";
import YTVideoWrapper from "src/pages/yTVideoWrapper/YTVideoWrapper";
import WizardChartsPage from "src/pages/wizardChartsPage/WizardChartsPage";
import {
	default as Error503,
	default as ErrorNotResponding,
} from "src/pages/errorPages/error503";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/error403" element={<Error403 />} />
			<Route path="/error404" element={<Error404 />} />
			<Route path="/error500" element={<Error500 />} />
			<Route path="/error503" element={<Error503 />} />
			<Route path="/error_not_responding" element={<ErrorNotResponding />} />
			<Route path="mainPage" element={<YTVideoWrapper />} />
			<Route path="wizardChartsPage" element={<WizardChartsPage />} />
			<Route path="*" element={<Error404 />} />
			<Route
				path="/"
				element={
					<ErrorsBoundary>
						<YTVideoWrapper />
					</ErrorsBoundary>
				}
			>
				<Route index element={<YTVideoWrapper />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
