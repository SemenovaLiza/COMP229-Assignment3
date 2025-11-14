import project01 from "./../img/projects/01.png";
import project01Big from "./../img/projects/01-big.png";

import project02 from "./../img/projects/02.png";
import project02Big from "./../img/projects/02-big.png";

import project03 from "./../img/projects/03.png";

import project04 from "./../img/projects/04.jpg";
import project04Big from "./../img/projects/04-big.png";


const projects = [
	{
		title: 'Web Recipe Assistant',
		stack: 'DRF, Djoser, PostgreSQL, Docker, React',
		description: (
			<div className="header__text">
				<p>
					A web app for sharing and discovering recipes. Users can publish dishes, save favorites, follow authors, and generate shopping lists.<br /><br />
					<b>Tech Highlights:</b><br />
					1. REST API with role-based access<br />
					2. Automated CI/CD: linting (PEP8 via flake8), Docker image build & push, remote deployment, and Telegram notifications<br />
					3. Backend & frontend fully containerized with Docker
				</p>
			</div>
		),
		img: project02,
		imgBig: project02Big,
		gitHubLink: 'https://github.com/SemenovaLiza/foodio',
	},
	{
		title: 'Link Shortener Service',
		description: (
			<div className="header__text">
				<p>
					A web service for mapping long URLs to short, user-friendly ones — either custom-defined or auto-generated.<br></br>
					<b>Key Features:</b><br></br>
					1. Generate short links linked to original URLs<br></br>
					2. Redirect users to the original address via short links<br></br>
					3. Full REST API support
            	</p>
			</div>
		),
		img: project03,
		imgBig: project03,
		stack: 'Python, Flask',
		gitHubLink: 'https://github.com/SemenovaLiza/link_cutter',
	},
	{
		title: 'Networking Bot - in progress',
		description: (
            <div className="header__text">
				<p>
					<strong>Microservices-based system</strong> for student collaboration and
					feedback management, deployed in a fully containerized environment.
				</p>

				<p>
					<strong>Features & Highlights:</strong><br />
					1. Telegram Bot for student interactions (pair matching, feedback, complaints).<br />
					2. PostgreSQL + Adminer for relational data management.<br />
					3. Celery + Redis for task scheduling and queue processing (e.g., meeting reminders, feedback collection).<br />
					4. Ngrok for webhook support.<br />
					Monitoring & Observability: Promtail + Loki + Grafana for log aggregation and visualization.
				</p>

				<p>
					<strong>Data Model:</strong><br />
					1. Student profiles (status, specialization, rating, ban logic).<br />
					2. Matched pairs with meeting status tracking.<br />
					3. Feedback & complaint management with admin review.<br />
					4. Dynamic rating system balancing first impressions and cumulative feedback.
				</p>

				<p>
					<strong>Impact:</strong><br />
					Automated student pairing and evaluation process.<br />
					Improved community engagement.<br />
					Provided scalable monitoring with Grafana dashboards.
				</p>
			</div>
		),
		img: project01,
		imgBig: project01Big,
		stack: 'Aiogram, SQLAlchemy, Celery, Poetry',
		gitHubLink: 'https://github.com/SemenovaLiza/networking_bot',
	},
	{
		title: 'Microservices-Based Streaming Platform',
		description: (
			<div className="header__text">
				<p>
                    A scalable, modular platform designed to simulate the core
                    architecture of modern streaming services (e.g., Netflix, YouTube).<br /><br />
                    <b>Asynchronous API</b> — Handles client requests efficiently with non-blocking communication for smooth user experience.<br /><br />
                    <b>Recommendation System</b> — Provides personalized movie suggestions using a dedicated Recommendation Service API and core recommendation logic.<br /><br />
                    <b>ETL Pipelines</b> — Extract, transform, and load movie and user interaction data; index results in Elasticsearch for fast search and use Redis for caching.<br /><br />
                    <b>Relational Databases</b> — PostgreSQL stores structured data across services: movies, user-generated content, and recommendation metadata.<br /><br />
                    <b>Containerized Architecture</b> — Each service runs in an isolated container via Docker Compose, enabling independent scaling, easier debugging, and clear modularity.<br /><br />
                </p>
			</div>
		),
		img: project04,
		imgBig: project04Big,
		stack: 'Python, FastAPI, Redis, Elasticsearch, Recommendation System, docker compose',
		gitHubLink: 'https://github.com/SemenovaLiza/SilverStream'
	},
];

export {projects}