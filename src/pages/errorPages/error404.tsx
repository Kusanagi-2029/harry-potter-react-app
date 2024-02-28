import ImgSrc from "../../assets/harryPotter.png";
import classes from "./error.module.css";

const Error404 = () => {
	return (
		<div className={classes.error}>
			<div className={classes.errorHeader}>
				<h1>Ошибка 404</h1>
				<h2>Сервер не смог найти запрашиваемую страницу</h2>
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

export default Error404;
