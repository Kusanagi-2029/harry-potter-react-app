import { FC } from "react";
import classes from "./DateRangeInput.module.css";

interface DateRangeInputProps {
	startDate: string;
	endDate: string;
	onStartDateChange: (date: string) => void;
	onEndDateChange: (date: string) => void;
	onSubmit: () => void;
}

const DateRangeInput: FC<DateRangeInputProps> = ({
	startDate,
	endDate,
	onStartDateChange,
	onEndDateChange,
	onSubmit,
}) => {
	return (
		<div className={classes.dateInput}>
			<input
				type="date"
				value={startDate}
				onChange={(e) => onStartDateChange(e.target.value)}
				min="0001-01-01"
				max="9999-12-31"
			/>
			<input
				type="date"
				value={endDate}
				onChange={(e) => onEndDateChange(e.target.value)}
				min="0001-01-01"
				max="9999-12-31"
			/>
			<button onClick={onSubmit}>Выбрать</button>
		</div>
	);
};

export default DateRangeInput;
