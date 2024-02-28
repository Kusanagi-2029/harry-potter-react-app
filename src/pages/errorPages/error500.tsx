import ImgSrc from "../../assets/harryPotter.png";
import classes from "./error.module.css";

const Error500 = () => {
	return (
		<div className={classes.error}>
			<div className={classes.errorHeader}>
				<h1>Ошибка 500</h1>
				<h2>На сервере произошла непредвиденная ошибка</h2>
				<h3>Попробуйте зайти попозже</h3>
			</div>
			<div className={classes.errorcontainer}>
				<img
					className={classes.errorLogo}
					src={ImgSrc}
					alt="Harry Potter Logo"
				/>
			</div>
		</div>
	);
};

export default Error500;
