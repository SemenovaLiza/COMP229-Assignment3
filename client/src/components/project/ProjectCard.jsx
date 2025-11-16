import { NavLink } from 'react-router-dom';
import './style.css';

const ProjectCard = ({ title, index }) => {
	return (
		<NavLink to={`/project/${index}`}>
			<li className="project">
				<h3 className="project__title">{title}</h3>
			</li>
		</NavLink>
	);
};

export default ProjectCard;
