import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { signin } from '../user/api-auth.js';
import auth from '../user/auth-helper.js';
import './auth.css';

export default function Signin() {
	const [values, setValues] = useState({
		email: '',
		password: ''
	});
	const [errors, setErrors] = useState({});
	const [serverError, setServerError] = useState('');
	const navigate = useNavigate();
	const location = useLocation();

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
		// Clear error for this field when user starts typing
		if (errors[name]) {
			setErrors({ ...errors, [name]: '' });
		}
		setServerError('');
	};

	const validateForm = () => {
		const newErrors = {};

		if (!values.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			newErrors.email = 'Please enter a valid email';
		}

		if (!values.password) {
			newErrors.password = 'Password is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		const user = {
			email: values.email,
			password: values.password
		};

		signin(user).then((data) => {
			if (data && data.error) {
				setServerError(data.error);
			} else {
				// Store JWT token
				auth.authenticate(data, () => {
					// Redirect to the page they were trying to access, or home
					const from = location.state?.from?.pathname || '/';
					navigate(from, { replace: true });
				});
			}
		});
	};

	return (
		<div className="auth-page">
			<div className="container">
				<div className="auth-wrapper">
					<div className="auth-header">
						<h1 className="auth-title">
							Welcome <em>Back</em>
						</h1>
						<p className="auth-subtitle">
							Sign in to continue to your projects
						</p>
					</div>

					<div className="auth-form-container">
						<form className="auth-form" onSubmit={handleSubmit}>
							{serverError && (
								<div className="error-message">
									{serverError}
								</div>
							)}

							<div className="form-group">
								<label htmlFor="email">Email Address</label>
								<input
									type="email"
									id="email"
									placeholder="Enter your email"
									value={values.email}
									onChange={handleChange('email')}
									className={errors.email ? 'error' : ''}
									autoComplete="email"
								/>
								{errors.email && (
									<span className="field-error">{errors.email}</span>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									placeholder="Enter your password"
									value={values.password}
									onChange={handleChange('password')}
									className={errors.password ? 'error' : ''}
									autoComplete="current-password"
								/>
								{errors.password && (
									<span className="field-error">{errors.password}</span>
								)}
							</div>

							<button type="submit" className="btn btn-auth">
								Sign In
							</button>

							<div className="auth-footer">
								<p>
									Don't have an account?{' '}
									<Link to="/signup" className="auth-link">
										Sign Up
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}