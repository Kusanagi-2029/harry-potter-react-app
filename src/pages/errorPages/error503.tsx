import ImgSrc from "../../assets/harryPotter.png";
import classes from "./error.module.css";

const Error503 = () => {
	return (
		<div className={classes.error}>
			<div className={classes.errorHeader}>
				<h1>Ошибка 503</h1>
				{/* При её наличии: */}
				<h2>Требуется сетевая аутентификация</h2>
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

export default Error503;
