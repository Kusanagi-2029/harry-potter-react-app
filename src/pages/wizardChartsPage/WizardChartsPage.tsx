/* eslint-disable no-nested-ternary */
import { FC, useEffect, useState } from "react";

import classes from "./WizardChartsPage.module.css";
import SwitchPanel from "../../components/global/switchPanel/SwitchPanel";
import ChartComponent from "../../components/global/charts/ChartComponent";
import DateRangeInput from "../../components/global/dateRangeInput/DateRangeInput";
import logo from "../../assets/harryPotter.png";
import { WisardsInfoService } from "src/services/wizardsInfoService";
import { Navigate } from "react-router-dom";
import ErrorExample from "src/errors/errorExample/errorExample";

interface Character {
	id: string;
	name: string;
	house: string; // Добавляем свойство 'house' типа boolean для проверки, к какому факультету относится
	dateOfBirth: string;
	wizard: boolean; // Добавляем свойство 'wizard' типа boolean для проверки, волшебник ли
}

const WizardChartsPage: FC = () => {
	const [isAllChoiced, setAllChoiced] = useState(true);
	const [isWizardsChoiced, setWizardsChoiced] = useState(false);
	const [isFilteredWizardsChoiced, setFilteredWizardsChoiced] = useState(false);

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [filteredDataByWizard, setFilteredDataByWizard] = useState<Character[]>(
		[],
	);
	const [filteredData, setFilteredData] = useState<Character[]>([]);
	const [characterList, setCharacterList] = useState<Character[]>([]);

	const [isDataLoaded, setDataLoaded] = useState<boolean>(true);

	/** Объединение props'ов для вызова одного и того же компонента с разными значениями filteredData */
	const chartProps = {
		data: isAllChoiced
			? characterList
			: isWizardsChoiced
				? filteredDataByWizard
				: filteredData,
		startDate,
		endDate,
		isAllChoiced,
		filteredDataByWizard,
		filteredData,
	};

	// Для оптимизации размера приходящих данных и предотвращения повторных вызовов можно воспользоваться кэшированием данных. Одним из способов сделать это является сохранение полученных данных в локальном состоянии компонента и использование этого кэша при необходимости, вместо повторного запроса на сервер.
	// В этом примере мы добавили проверку наличия кэша в localStorage. Если данные уже есть в кэше, они загружаются из него без повторного запроса на сервер. В противном случае данные загружаются с сервера, сохраняются в кэше и используются для отображения. Таким образом, мы избегаем лишних запросов на сервер и оптимизируем размер приходящих данных.

	useEffect(() => {
		const fetchData = async () => {
			const cachedData = localStorage.getItem("characterList");
			if (cachedData) {
				setCharacterList(JSON.parse(cachedData));
			} else {
				try {
					const data = await WisardsInfoService.getAllWisards();
					setCharacterList(data);
					localStorage.setItem("characterList", JSON.stringify(data));
					setDataLoaded(true);
				} catch (error) {
					setDataLoaded(false);
					console.error("Error fetching data:", error);
				}
			}
		};

		fetchData();
	}, []);

	const filterData = () => {
		/** Фильтрация по всем магам */
		const filteredByWizard = characterList.filter(({ dateOfBirth, wizard }) => {
			const dob = new Date(dateOfBirth);
			return (
				dob >= new Date(startDate) &&
				dob <= new Date(endDate) &&
				wizard !== false
			);
		});
		setFilteredDataByWizard(filteredByWizard);

		/** Фильтрация и по магам, и по зачисленным магам */
		const filtered = characterList.filter(({ dateOfBirth, wizard, house }) => {
			const dob = new Date(dateOfBirth);
			return (
				dob >= new Date(startDate) &&
				dob <= new Date(endDate) &&
				wizard !== false &&
				house !== ""
			);
		});
		setFilteredData(filtered);
	};

	const handleSubmit = () => {
		filterData();
	};

	return (
		<div className={classes.mainСontainer}>
			{!isDataLoaded && <Navigate to="/error500" replace />}

			<div className={classes.logo}>
				<img src={logo} alt="Пикча Harry Potter" />
			</div>
			<div className={classes.otherContent}>
				<DateRangeInput
					startDate={startDate}
					endDate={endDate}
					onStartDateChange={setStartDate}
					onEndDateChange={setEndDate}
					onSubmit={handleSubmit}
				/>
				<SwitchPanel
					setAllChoiced={setAllChoiced}
					setWizardsChoiced={setWizardsChoiced}
					setFilteredWizardsChoiced={setFilteredWizardsChoiced}
				/>
				<ErrorExample />
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
					}}
				>
					<ChartComponent {...chartProps} />
				</div>
			</div>
		</div>
	);
};

export default WizardChartsPage;
