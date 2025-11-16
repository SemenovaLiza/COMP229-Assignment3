import "./styles/main.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import EditProject from "./pages/EditProject";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import Qualification from "./pages/Qualifications.jsx";
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import PrivateRoute from './pages/PrivateRoute';
import ScrollToTop from "./utils/scrollToTop"

function App() {
  return (
		<div className="App">
			<Router>
				<ScrollToTop />
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
					<Route path="/project/edit/:id" element={<PrivateRoute><EditProject /></PrivateRoute>} />
					<Route path="/project/:id" element={<PrivateRoute><Project /></PrivateRoute>} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/about" element={<About />} />
					<Route path="/qualifications" element={<Qualification />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signin" element={<Signin />} />
				</Routes>
				<Footer />
			</Router>
		</div>
  );
}

export default App;
