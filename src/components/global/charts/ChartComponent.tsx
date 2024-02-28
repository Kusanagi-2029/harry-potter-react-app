/* eslint-disable no-nested-ternary */
import { FC, useEffect, useRef, useState } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import classes from "./ChartComponent.module.css";

interface PieChartProps {
	data: { id: string; name: string; house: string }[];
	filteredDataByWizard: { id: string; name: string; house: string }[];
	filteredData: { id: string; name: string; house: string }[];
	startDate?: string;
	endDate?: string;
	isAllChoiced?: boolean;
}

const ChartComponent: FC<PieChartProps> = ({
	data,
	filteredDataByWizard,
	filteredData,
	startDate,
	endDate,
	isAllChoiced,
}) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstanceRef = useRef<Chart<"pie", number[], string> | null>(null);

	useEffect(() => {
		if (chartRef.current) {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}

			const ctx = chartRef.current.getContext("2d");

			if (ctx) {
				const groupedData = data.reduce(
					(acc, obj) => {
						acc[obj.house] = (acc[obj.house] || 0) + 1;
						return acc;
					},
					{} as Record<string, number>,
				);

				const labels = Object.keys(groupedData);
				const values = Object.values(groupedData);

				const config: ChartConfiguration<"pie", number[], string> = {
					type: "pie",
					data: {
						labels,
						datasets: [
							{
								label: "House Distribution",
								data: values,
								backgroundColor: [
									"rgba(255, 140, 0, 1)",
									"rgba(0, 200, 42, 0.7)",
									"rgba(75, 15, 255, 1)",
									"rgba(255, 99, 132, 0.6)",
									"rgba(210, 0, 125, 1)",
									"rgba(0, 128, 45, 1)",
									"rgba(251, 255, 0, 1)",
								],
							},
						],
					},
				};

				chartInstanceRef.current = new Chart(ctx, config);
			}
		}
	}, [data]);

	return (
		<div className={classes.chartComponent}>
			{(startDate && endDate) === "" && isAllChoiced !== true && (
				<h1>Введите обе даты</h1>
			)}

			{isAllChoiced === true ? (
				<canvas
					ref={chartRef}
					style={{
						display: "flex",
						position: "relative",
						maxWidth: "500px",
						maxHeight: "500px",
					}}
				/>
			) : (!filteredData.length || !filteredDataByWizard.length) &&
			  (startDate && endDate) === "" ? (
				<canvas
					ref={chartRef}
					style={{
						display: "flex",
						position: "relative",
						maxWidth: "0px",
						maxHeight: "0px",
					}}
				/>
			) : !filteredData.length || !filteredDataByWizard.length ? (
				<>
					<h1>Таких магов, к сожалению, нет</h1>
					<canvas
						ref={chartRef}
						style={{
							display: "flex",
							position: "relative",
							maxWidth: "0px",
							maxHeight: "0px",
						}}
					/>
				</>
			) : (
				<canvas
					ref={chartRef}
					style={{
						display: "flex",
						position: "relative",
						maxWidth: "500px",
						maxHeight: "500px",
					}}
				/>
			)}
		</div>
	);
};

export default ChartComponent;
