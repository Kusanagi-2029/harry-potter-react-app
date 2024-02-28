/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { ErrorInfo } from "react";
import { Navigate } from "react-router-dom";

type Props = {
	children: React.ReactNode;
};

type State = {
	error: Error | null;
	errorInfo: ErrorInfo | null;
};

export default class ErrorBoundary extends React.Component<Props, State> {
	public state: State = {
		error: null,
		errorInfo: null,
	};

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Catch errors in any components below and re-render with error message
		this.setState({
			error,
			errorInfo,
		});
		// You can also log error messages to an error reporting service here
		console.error("Uncaught error: ", error, errorInfo);
	}

	render() {
		if (this.state.errorInfo || this.state.error) {
			// Error path
			return <Navigate to="/error500" />;
		}
		// Normally, just render children
		return this.props.children;
	}
}
