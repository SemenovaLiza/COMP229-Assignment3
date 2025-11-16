import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { read, update } from '../api/api-project.js';
import auth from '../user/auth-helper.js';
import './style.css';

export default function EditProject() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);
	const { register, handleSubmit, formState: { errors }, reset } = useForm();
	const jwt = auth.isAuthenticated();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		let isMounted = true; // Track if component is still mounted

		if (jwt && id) {
			read({ projectId: id }, { t: jwt.token }, signal).then((data) => {
				// Only update state if component is still mounted
				if (!isMounted) return;

				console.log('API Response:', data); // Debug log
				
				if (!data) {
					setError('Failed to load project');
					setLoading(false);
					return;
				}
				
				if (data.error) {
					// Don't show "Request cancelled" as an error to user
					if (data.error !== 'Request cancelled') {
						setError(data.error);
					}
					setLoading(false);
				} else {
					// Safely populate form with existing project data
					reset({
						title: data.title || "",
						firstname: data.firstname || "",
						lastname: data.lastname || "",
						email: data.email || "",
						completion: data.completion || "",
						description: data.description || "",
						gitHubLink: data.gitHubLink || ""
					});
					setLoading(false);
				}
			}).catch((err) => {
				if (!isMounted) return;
				
				console.error('Error loading project:', err);
				// Don't show abort errors to user
				if (err.name !== 'AbortError') {
					setError('Failed to load project');
				}
				setLoading(false);
			});
		} else if (!jwt) {
			setError('You must be signed in to edit a project');
			setLoading(false);
		}

		return function cleanup() {
			isMounted = false; // Mark component as unmounted
			abortController.abort();
		};
	}, [id, jwt, reset]);

	const submitForm = (formData) => {
		const project = {
			title: formData.title || undefined,
			firstname: formData.firstname || undefined,
			lastname: formData.lastname || undefined,
			email: formData.email || undefined,
			completion: formData.completion || undefined,
			description: formData.description || undefined,
			gitHubLink: formData.gitHubLink || undefined,
		};

		if (jwt) {
			update({ projectId: id }, { t: jwt.token }, project).then((data) => {
				if (data && data.error) {
					setError(data.error);
				} else {
					navigate(`/project/${id}`);
				}
			}).catch((err) => {
				console.error('Error updating project:', err);
				setError('Failed to update project');
			});
		} else {
			setError('You must be signed in to edit a project');
		}
	};

	if (loading) {
		return (
			<main className="section">
				<div className="container">
					<p style={{ color: 'var(--white)', textAlign: 'center' }}>Loading project...</p>
				</div>
			</main>
		);
	}

	if (error && !jwt) {
		return (
			<main className="section">
				<div className="container">
					<div className="error-message" style={{ maxWidth: '800px', margin: '0 auto' }}>
						{error}
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="section">
			<div className="container">
				<h2 className="title-1">Edit Project</h2>

				<div className="contact-form">
					<h2>UPDATE PROJECT DETAILS</h2>
					
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

						{/* GitHub Link */}
						<div className="form-field">
							<input
								type="url"
								placeholder="GitHub Link (optional)"
								{...register("gitHubLink")}
							/>
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

						{/* Action Buttons */}
						<button type="submit" className="btn">
							Update Project
						</button>
						<button 
							type="button" 
							className="btn"
							onClick={() => navigate(`/project/${id}`)}
							style={{ 
								background: '#444', 
								marginLeft: '12px'
							}}
						>
							Cancel
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}