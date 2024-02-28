import axios from "axios";
import appsettings from "../appSettings.json";

interface Character {
	id: string;
	name: string;
	house: string;
	dateOfBirth: string;
	wizard: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export const WisardsInfoService = {
	/** Корректный запрос на сервер за всей информацией по волшебникам */
	async getAllWisards(): Promise<Character[]> {
		const response = await axios.get(appsettings.urls.getAllWisards);
		return response.data as Character[];
	},

	/** Некорректный запрос для примера отработки ошибки 500 */
	async getAllWisardsCorrupted(): Promise<Character[]> {
		const response = await axios.get(appsettings.urls.getAllWisardsBroken);
		return response.data as Character[];
	},
};
