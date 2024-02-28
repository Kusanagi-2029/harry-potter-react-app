import { FC } from "react";
import classes from "./SwitchPanel.module.css";

interface SwitchPanelProps {
	setAllChoiced: (isAllChoiced: boolean) => void;
	setWizardsChoiced: (isWizardsChoiced: boolean) => void;
	setFilteredWizardsChoiced: (isFilteredWizardsChoiced: boolean) => void;
}

const SwitchPanel: FC<SwitchPanelProps> = ({
	setAllChoiced,
	setWizardsChoiced,
	setFilteredWizardsChoiced,
}) => {
	return (
		<div className={classes.Choice}>
			<button
				className={classes.All}
				onClick={() => {
					setAllChoiced(true);
					setWizardsChoiced(false);
					setFilteredWizardsChoiced(false);
				}}
			>
				Все
			</button>
			<button
				className={classes.Wizards}
				onClick={() => {
					setAllChoiced(false);
					setWizardsChoiced(true);
					setFilteredWizardsChoiced(false);
				}}
			>
				Маги
			</button>
			<button
				className={classes.FilteredWizards}
				onClick={() => {
					setAllChoiced(false);
					setWizardsChoiced(false);
					setFilteredWizardsChoiced(true);
				}}
			>
				Зачисленные маги
			</button>
		</div>
	);
};

export default SwitchPanel;
