import { FC, useEffect, useState } from "react";
import classes from "./errorExample.module.css";
import { Navigate } from "react-router-dom";
import { WisardsInfoService } from "src/services/wizardsInfoService";

const ErrorExample: FC = () => {
	const [isButtonPressed, setButtonPressed] = useState<boolean>(false);
	const [isDataLoaded, setDataLoaded] = useState<boolean>(true);

	/** ДЕМО отработки обработчика 500-ой */
	const fetchData = async () => {
		try {
			/** Умышленно пытаемся получить данные по некорректной ссылке */
			const data = await WisardsInfoService.getAllWisardsCorrupted();
			setButtonPressed(true);
			setDataLoaded(true);
		} catch (error) {
			setButtonPressed(false);
			setDataLoaded(false);
			console.error("Error fetching data:", error);
		}
	};

	return (
		<div className={classes.Buttons}>
			{!isDataLoaded && <Navigate to="/error500" replace />}
			{isButtonPressed && (
				<Navigate to="/Страница_Ошибки404-Неизвестный_путь" replace />
			)}

			<p>Примеры отрабатывающих ошибок: </p>

			<button
				className={classes.Error500}
				onClick={() => {
					fetchData();
				}}
			>
				Error500
			</button>
			<button
				className={classes.Error404}
				onClick={() => {
					setButtonPressed(!isButtonPressed);
				}}
			>
				Error404
			</button>
		</div>
	);
};

export default ErrorExample;
