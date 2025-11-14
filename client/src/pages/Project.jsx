import {useParams} from "react-router-dom";
import BtnGitHub from "../components/btnGitHub/BtnGitHub";
import {projects} from "./../helpers/projectsList"
// file for a single project page
const Project = () => {
	const {id} = useParams();
	const project = projects[id];

    return (
		<main className="section">
			<div className="container">
				<div className="project-details">
					<h1 className="title-1">{project.title}</h1>
					<div className="project-details__desc">
						<p>Stack: {project.stack}</p>
					</div>
					<img
						src={project.imgBig}
						alt={project.title}
						className="project-details__cover"
					/>

					<div className="project-details__desc">
						<p>{project.description}</p>
					</div>

					{project.gitHubLink && (
						<BtnGitHub link="https://github.com" />
					)}
				</div>
			</div>
		</main>
	);
}

export default Project;