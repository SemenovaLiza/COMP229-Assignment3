import "./styles/main.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import Services from "./pages/Services";
import Signup from '../user/Signup.jsx'
import Signin from '../user/Signin.jsx'

import ScrollToTop from "./utils/scrollToTop"

function App() {
  return (
		<div className="App">
			<Router>
				<ScrollToTop />
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />}/>
					<Route path="/signin" element={<Signin />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/project/:id" element={<Project />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/about" element={<About />} />
					<Route path="/services" element={<Services />} />
				</Routes>
				<Footer />
			</Router>
		</div>
  );
}

export default App;
