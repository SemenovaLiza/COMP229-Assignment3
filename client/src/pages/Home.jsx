import "./style.css";

const Home = () => {
    return (
		<header className="header">
			<div className="header__wrapper">
				<h1 className="header__title">
					<strong>
						Hi, my name is <em>Liza</em>
					</strong>
					<br />a Data Scientist/Backend Developer
				</h1>
				<div className="header__text">
					<p>with passion for learning and exploaring.</p>
				</div>
				<div className="header__links">
					<a href="/about" className="btn">About Me</a>
				</div>
			</div>
		</header>
	);
}

export default Home;