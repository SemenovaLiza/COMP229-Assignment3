import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { read, remove } from '../api/api-project.js';
import auth from '../user/auth-helper.js';
import BtnGitHub from "../components/btnGitHub/BtnGitHub";
import { Button } from '@mui/material';

// Page for displaying a single project
const Project = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [project, setProject] = useState(null);
	const [error, setError] = useState('');
	const jwt = auth.isAuthenticated();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		if (jwt && id) {
			read({ projectId: id }, { t: jwt.token }, signal).then((data) => {
				if (data && data.error) {
					setError(data.error);
				} else {
					setProject(data);
				}
			});
		}

		return function cleanup() {
			abortController.abort();
		};
	}, [id, jwt]);

	const deleteProject = () => {
		if (jwt && window.confirm('Are you sure you want to delete this project?')) {
			remove({ projectId: id }, { t: jwt.token }).then((data) => {
				if (data && data.error) {
					setError(data.error);
				} else {
					navigate('/projects');
				}
			});
		}
	};

	if (!project) {
		return (
			<main className="section">
				<div className="container">
					<p>{error || 'Loading project...'}</p>
				</div>
			</main>
		);
	}

	return (
		<main className="section">
			<div className="container">
				<div className="project-details">
					<h1 className="title-1">{project.title}</h1>
					
					{project.firstname && project.lastname && (
						<div className="project-details__desc">
							<p>Created by: {project.firstname} {project.lastname}</p>
						</div>
					)}

					{project.email && (
						<div className="project-details__desc">
							<p>Contact: {project.email}</p>
						</div>
					)}

					{project.completion && (
						<div className="project-details__desc">
							<p>Completion Date: {project.completion}</p>
						</div>
					)}

					<div className="project-details__desc">
						<p>{project.description}</p>
					</div>

					{project.gitHubLink && (
						<BtnGitHub link={project.gitHubLink} />
					)}

					{jwt && (
						<div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
							<Button 
								variant="outlined" 
								color="primary"
								onClick={() => navigate(`/project/edit/${id}`)}
							>
								Edit Project
							</Button>
							<Button 
								variant="outlined" 
								color="error"
								onClick={deleteProject}
							>
								Delete Project
							</Button>
						</div>
					)}

					{error && (
						<p style={{ color: 'red', marginTop: 10 }}>{error}</p>
					)}
				</div>
			</div>
		</main>
	);
}

export default Project;