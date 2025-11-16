import { Navigate, useLocation } from 'react-router-dom';
import auth from '../user/auth-helper.js';

// Component to protect routes that require authentication
export default function PrivateRoute({ children }) {
	const location = useLocation();
	const isAuthenticated = auth.isAuthenticated();

	if (!isAuthenticated) {
		// Redirect to signin page, but save the location they were trying to access
		return <Navigate to="/signin" state={{ from: location }} replace />;
	}

	return children;
}