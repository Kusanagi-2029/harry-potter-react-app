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
	async getAllWisards(): Promise<Character[]> {
		const response = await axios.get(appsettings.urls.getAllWisards);
		return response.data as Character[];
	},
};
