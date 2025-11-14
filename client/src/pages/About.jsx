import "./style.css";
import photo from "../img/photo.jpeg";
import resume from "../files/Software_Developer_Resume.pdf";

const About = () => {
    return (
		<header className="header">
			<div className="header__wrapper">
				<h1 className="header__title">
					<strong>
						<em>Semenova Liza</em>
					</strong>
				</h1>
				<div className="header__text">
					<p>Python Backend Developer & Head of Software Engineering Department.
                        Experienced in building robust REST APIs with FastAPI, Flask, and DRF,
                        skilled in microservices and high-traffic production systems. Focused on
                        scalability, reliability, and performance. Organize and lead software engineering
                        events while contributing to elegant backend solutions.
                    </p>
				</div>
                <div className="header__image">
                    <img src={photo} alt="Semenova Liza" />
                </div>
				<div className="header__links">
					<a className="btn" href={resume} download="">Download Resume</a>
                    <a className="btn" href={resume} target="_blank">View Resume</a>
				</div>
			</div>
		</header>
	);
}

export default About;