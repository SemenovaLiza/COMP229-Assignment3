import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { create } from '../user/api-user.js';
import './auth.css';

export default function Signup() {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [errors, setErrors] = useState({});
	const [serverError, setServerError] = useState('');
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

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

		if (!values.name.trim()) {
			newErrors.name = 'Name is required';
		}

		if (!values.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			newErrors.email = 'Please enter a valid email';
		}

		if (!values.password) {
			newErrors.password = 'Password is required';
		} else if (values.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		if (!values.confirmPassword) {
			newErrors.confirmPassword = 'Please confirm your password';
		} else if (values.password !== values.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
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
			name: values.name,
			email: values.email,
			password: values.password
		};

		create(user).then((data) => {
			if (data && data.error) {
				setServerError(data.error);
			} else {
				setSuccess(true);
				// Redirect to signin after 2 seconds
				setTimeout(() => {
					navigate('/signin');
				}, 2000);
			}
		});
	};

	return (
		<div className="auth-page">
			<div className="container">
				<div className="auth-wrapper">
					<div className="auth-header">
						<h1 className="auth-title">
							Create Your <em>Account</em>
						</h1>
						<p className="auth-subtitle">
							Join us and start managing your projects
						</p>
					</div>

					<div className="auth-form-container">
						{success ? (
							<div className="success-message">
								<div className="success-icon">✓</div>
								<h2>Account Created Successfully!</h2>
								<p>Redirecting to sign in...</p>
							</div>
						) : (
							<form className="auth-form" onSubmit={handleSubmit}>
								{serverError && (
									<div className="error-message">
										{serverError}
									</div>
								)}

								<div className="form-group">
									<label htmlFor="name">Full Name</label>
									<input
										type="text"
										id="name"
										placeholder="Enter your full name"
										value={values.name}
										onChange={handleChange('name')}
										className={errors.name ? 'error' : ''}
									/>
									{errors.name && (
										<span className="field-error">{errors.name}</span>
									)}
								</div>

								<div className="form-group">
									<label htmlFor="email">Email Address</label>
									<input
										type="email"
										id="email"
										placeholder="Enter your email"
										value={values.email}
										onChange={handleChange('email')}
										className={errors.email ? 'error' : ''}
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
										placeholder="Create a password (min 6 characters)"
										value={values.password}
										onChange={handleChange('password')}
										className={errors.password ? 'error' : ''}
									/>
									{errors.password && (
										<span className="field-error">{errors.password}</span>
									)}
								</div>

								<div className="form-group">
									<label htmlFor="confirmPassword">Confirm Password</label>
									<input
										type="password"
										id="confirmPassword"
										placeholder="Re-enter your password"
										value={values.confirmPassword}
										onChange={handleChange('confirmPassword')}
										className={errors.confirmPassword ? 'error' : ''}
									/>
									{errors.confirmPassword && (
										<span className="field-error">{errors.confirmPassword}</span>
									)}
								</div>

								<button type="submit" className="btn btn-auth">
									Sign Up
								</button>

								<div className="auth-footer">
									<p>
										Already have an account?{' '}
										<Link to="/signin" className="auth-link">
											Sign In
										</Link>
									</p>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}