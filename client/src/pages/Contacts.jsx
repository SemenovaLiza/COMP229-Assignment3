import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Contacts = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		contactNumber: "",
		email: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted:", formData);

		// Redirect back to home page
		navigate("/");
	};

	return (
		<main className="section">
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

				{/* Contact Form */}
				<div className="contact-form">
					<h2 className="title-2" id="contact-form">Send me a message</h2>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							name="firstName"
							placeholder="First Name"
							value={formData.firstName}
							onChange={handleChange}
							required
						/>
						<input
							type="text"
							name="lastName"
							placeholder="Last Name"
							value={formData.lastName}
							onChange={handleChange}
							required
						/>
						<input
							type="text"
							name="contactNumber"
							placeholder="Contact Number"
							value={formData.contactNumber}
							onChange={handleChange}
						/>
						<input
							type="email"
							name="email"
							placeholder="Email Address"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<textarea
							name="message"
							placeholder="Your Message"
							value={formData.message}
							onChange={handleChange}
							required
						/>
						<button type="submit" className="btn">
							Send Message
						</button>
					</form>
				</div>
			</div>
		</main>
	);
};

export default Contacts;
