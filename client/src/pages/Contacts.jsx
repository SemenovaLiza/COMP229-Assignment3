import React, { useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { create } from '../api/api-contact.js';
import '@fontsource/roboto/400.css';

export default function Contact() {
	const { register, handleSubmit, formState: { errors }, reset } = useForm();
	
	const [notification, setNotification] = useState({
		show: false,
		message: '',
		isError: false
	});

	const submitForm = async (data) => {
		try {
			const result = await create(data);
			
			if (result.error) {
				setNotification({
					show: true,
					message: result.error,
					isError: true
				});
			} else {
				setNotification({
					show: true,
					message: result.message || 'Contact created successfully!',
					isError: false
				});
				// Reset form after successful submission
				reset();
			}
			
			// Hide notification after 5 seconds
			setTimeout(() => {
				setNotification({ show: false, message: '', isError: false });
			}, 5000);
		} catch (error) {
			console.error('Error submitting form:', error);
			setNotification({
				show: true,
				message: 'An unexpected error occurred. Please try again.',
				isError: true
			});
			
			setTimeout(() => {
				setNotification({ show: false, message: '', isError: false });
			}, 5000);
		}
	};

	return (
		<main className="header">
			<div className="container">
				<h1 className="title-1">Contacts</h1>

				<ul className="content-list">
					<li className="content-list__item">
						<h2 className="title-2">Location</h2>
						<p>Toronto, Canada</p>
					</li>
					<li className="content-list__item">
						<h2 className="title-2">WhatsApp</h2>
						<p>
							<a href="tel:+13434010542">+1 (343) 401-0542</a>
						</p>
					</li>
					<li className="content-list__item">
						<h2 className="title-2">Email</h2>
						<p>
							<a href="mailto:semenovalizaca@gmail.com">
								semenovalizaca@gmail.com
							</a>
						</p>
					</li>
				</ul>

				<div className="contact-form">
					<h2>Send Me A Message</h2>
					
					{notification.show && (
						<div className={notification.isError ? "error-message" : "success-message"}>
							{notification.message}
						</div>
					)}
					
					<form onSubmit={handleSubmit(submitForm)}>
						<div className="form-field">
							<input
								type="text"
								placeholder="First Name"
								{...register("firstname", { 
									required: "First name is required",
									minLength: {
										value: 2,
										message: "First name must be at least 2 characters"
									}
								})}
								className={errors.firstname ? 'error' : ''}
							/>
							{errors.firstname && (
								<span className="field-error">{errors.firstname.message}</span>
							)}
						</div>

						<div className="form-field">
							<input
								type="text"
								placeholder="Last Name"
								{...register("lastname", { 
									required: "Last name is required",
									minLength: {
										value: 2,
										message: "Last name must be at least 2 characters"
									}
								})}
								className={errors.lastname ? 'error' : ''}
							/>
							{errors.lastname && (
								<span className="field-error">{errors.lastname.message}</span>
							)}
						</div>

						<div className="form-field">
							<input
								type="email"
								placeholder="Email"
								{...register("email", { 
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Please enter a valid email address"
									}
								})}
								className={errors.email ? 'error' : ''}
							/>
							{errors.email && (
								<span className="field-error">{errors.email.message}</span>
							)}
						</div>

						<button type="submit" className="btn">
							Submit
						</button>
					</form>
				</div>
			</div>
		</main>
	);
};