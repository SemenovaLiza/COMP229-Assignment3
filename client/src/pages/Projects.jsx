import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { create, list } from '../api/api-project.js';
import auth from '../user/auth-helper.js';
import ProjectCard from '../components/project/ProjectCard.jsx';
import './style.css';

export default function Projects() {
	const [projects, setProjects] = useState([]);
	const [error, setError] = useState('');
	const { register, handleSubmit, formState: { errors }, reset } = useForm({
		defaultValues: {
			title: "",
			firstname: "",
			lastname: "",
			email: "",
			completion: "",
			description: ""
		}
	});
	const jwt = auth.isAuthenticated();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		if (jwt) {
			list({ t: jwt.token }, signal).then((data) => {
				if (data && data.error) {
					console.log(data.error);
				} else {
					setProjects(data || []);
				}
			});
		}

		return function cleanup() {
			abortController.abort();
		};
	}, [jwt]);

	const submitForm = (formData) => {
		const project = {
			title: formData.title || undefined,
			firstname: formData.firstname || undefined,
			lastname: formData.lastname || undefined,
			email: formData.email || undefined,
			completion: formData.completion || undefined,
			description: formData.description || undefined,
		};

		if (jwt) {
			create(project, { t: jwt.token }).then((data) => {
				if (data && data.error) {
					setError(data.error);
				} else {
					setError('');
					// Reset form
					reset();
					// Refresh project list
					list({ t: jwt.token }).then((data) => {
						if (data && !data.error) {
							setProjects(data);
						}
					});
				}
			});
		} else {
			setError('You must be signed in to create a project');
		}
	};

	return (
		<main className="header">
			<div className="container">
				<h2 className="title-1">Projects</h2>
				<ul className="projects">
					{projects.map((project, index) => {
						return (
							<ProjectCard
								key={project._id || index}
								title={project.title}
								index={project._id}
							/>
						);
					})}
				</ul>

				{jwt && (
					<div className="contact-form">
						<h2>ADD NEW PROJECT</h2>
						
						{error && (
							<div className="error-message">
								{error}
							</div>
						)}

						<form onSubmit={handleSubmit(submitForm)}>
							{/* Title */}
							<div className="form-field">
								<input
									type="text"
									placeholder="Project Title"
									{...register("title", { required: "Title is required" })}
									className={errors.title ? 'error' : ''}
								/>
								{errors.title && (
									<span className="field-error">{errors.title.message}</span>
								)}
							</div>

							{/* First Name */}
							<div className="form-field">
								<input
									type="text"
									placeholder="First Name"
									{...register("firstname", { required: "First name is required" })}
									className={errors.firstname ? 'error' : ''}
								/>
								{errors.firstname && (
									<span className="field-error">{errors.firstname.message}</span>
								)}
							</div>

							{/* Last Name */}
							<div className="form-field">
								<input
									type="text"
									placeholder="Last Name"
									{...register("lastname", { required: "Last name is required" })}
									className={errors.lastname ? 'error' : ''}
								/>
								{errors.lastname && (
									<span className="field-error">{errors.lastname.message}</span>
								)}
							</div>

							{/* Email */}
							<div className="form-field">
								<input
									type="email"
									placeholder="Email Address"
									{...register("email", { required: "Email is required" })}
									className={errors.email ? 'error' : ''}
								/>
								{errors.email && (
									<span className="field-error">{errors.email.message}</span>
								)}
							</div>

							{/* Completion Date */}
							<div className="form-field">
								<input
									type="text"
									placeholder="Completion Date (e.g., MM/DD/YYYY)"
									{...register("completion", { required: "Completion Date is required" })}
									className={errors.completion ? 'error' : ''}
								/>
								{errors.completion && (
									<span className="field-error">{errors.completion.message}</span>
								)}
							</div>

							{/* Description */}
							<div className="form-field">
								<textarea
									placeholder="Project Description"
									rows="4"
									{...register("description", { required: "Description is required" })}
									className={errors.description ? 'error' : ''}
								/>
								{errors.description && (
									<span className="field-error">{errors.description.message}</span>
								)}
							</div>

							{/* Submit Button */}
							<button type="submit" className="btn">
								Create Project
							</button>
						</form>
					</div>
				)}
			</div>
		</main>
	);
}