import { FC } from "react";
import { Link } from "react-router-dom";
import videoBg from "../../assets/videoBg.mp4";
import classes from "./YTVideoWrapper.module.css";

const YTVideoWrapper: FC = () => {
	return (
		<>
			<div className={classes.container}>
				<Link className={classes.linkButton} to="/wizardChartsPage">
					<p>Перейти к странице</p>
					<p>Диаграммы Факультетов</p>
				</Link>
			</div>
			<div className={classes.videocontainer}>
				<div className={classes.videoContaioverlayner} />
				<video src={videoBg} autoPlay loop muted />
			</div>
		</>
	);
};

export default YTVideoWrapper;
