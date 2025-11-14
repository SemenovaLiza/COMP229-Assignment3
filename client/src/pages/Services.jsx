import "./style.css";

const Services = () => {
    return (
		<header className="header">
			<div className="header__wrapper">
				<h1 className="header__title">
					<strong>
						<em>Services</em>
					</strong>
				</h1>
				<div className="header__text">
					<ul className="services-list">
                        <li>Backend Development</li>
                        <li>Data Science</li>
                        <li>Data Analysis</li>
                        <li>Machine Learning</li>
                        <li>Chat Bots Development</li>
                    </ul>
				</div>
			</div>
		</header>
	);
}

export default Services;